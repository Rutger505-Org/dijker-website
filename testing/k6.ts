import http from "k6/http";
import exec from "k6/execution";
import { check, sleep } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

const baseUrl = __ENV.BASE_URL ?? "https://dijker.rutgerpronk.com";
const pageUrl = `${baseUrl}/nl`;

// Every submission sends a real email through the SMTP server, so each
// virtual user submits exactly once instead of looping for a duration.
export const options = {
  scenarios: {
    contact: {
      executor: "per-vu-iterations",
      vus: Number(__ENV.VUS ?? 10),
      iterations: 1,
    },
  },
};

export default function () {
  const page = http.get(pageUrl);
  check(page, { "page loaded": (res) => res.status === 200 });

  // Next.js renders the server action as hidden $ACTION_* inputs, so posting
  // them back submits the form the same way a browser without JS would.
  const form = new FormData();
  page
    .html()
    .find('form input[type="hidden"]')
    .each((_, input) => {
      form.append(input.getAttribute("name"), input.getAttribute("value") ?? "");
    });

  const user = exec.vu.idInTest;
  form.append("firstName", "k6");
  form.append("lastName", `user ${user}`);
  form.append("email", `k6-user-${user}@example.com`);
  form.append("phone", "");
  form.append("message", `Load test message from k6 virtual user ${user}.`);

  sleep(Math.random() * 3 + 2);

  const submit = http.post(pageUrl, form.body(), {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form.boundary}`,
      Origin: baseUrl,
    },
  });
  check(submit, {
    "form accepted": (res) => res.status === 200,
    "message sent": (res) =>
      String(res.body).includes("Bedankt, je bericht is verstuurd."),
  });
}
