import { describe, expect, it } from "vitest";
import { isIosUserAgent, pickGermanVoice } from "./speak";

describe("iPhone speech selection", () => {
  it("recognises an iPhone, including an iPad that reports itself as a Mac", () => {
    expect(isIosUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)")).toBe(true);
    expect(isIosUserAgent("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)")).toBe(true);
    expect(isIosUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X)", "MacIntel", 5)).toBe(true);
    expect(isIosUserAgent("Mozilla/5.0 (Linux; Android 14)")).toBe(false);
    expect(isIosUserAgent("Mozilla/5.0 (Windows NT 10.0)")).toBe(false);
  });

  it("does not assign a remote German voice on iPhone", () => {
    const remote = { lang: "de-DE", localService: false };
    const local = { lang: "de-DE", localService: true };
    expect(pickGermanVoice([remote], true)).toBeNull();
    expect(pickGermanVoice([remote, local], true)).toBe(local);
    expect(pickGermanVoice([remote], false)).toBe(remote);
  });
});
