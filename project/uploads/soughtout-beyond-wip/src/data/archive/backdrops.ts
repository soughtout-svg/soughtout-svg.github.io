/**
 * Atmospheric backdrops generated with Higgsfield (model z_image).
 * These are AI illustrations, not NASA photos, and are labelled as such
 * wherever they appear.
 */
const HF = "https://d8j0ntlcm91z4.cloudfront.net/user_3M7a9SinuSPqEh0pE9HNbeUkjqm";

export const BACKDROPS = {
  moon: `${HF}/hf_20261115_063309_d06a5c06-6141-439c-9b4f-52fb3e676042.png`,
  mars: `${HF}/hf_20261115_063332_f93eca1b-7c64-4828-a5f1-4ecd56dde9fb.png`,
  deep: `${HF}/hf_20261115_063406_0556afc5-2b1c-4c29-9ecc-1e2a1f98796b.png`,
} as const;

export const BACKDROP_CREDIT = "Backdrop: AI illustration made with Higgsfield, not a NASA photo";

/** Scout, the site mascot: a front / side / back turnaround sheet. */
export const SCOUT_SHEET = `${HF}/hf_20261115_213415_91160541-0d8a-45b0-aab2-a143f23d835f.png`;
