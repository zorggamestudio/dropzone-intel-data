# Dropzone Intel data

Public data files for [Dropzone Intel](https://dropzone-intel-legal.pages.dev/guide.html), a companion app for HELLDIVERS 2.

- `war.json` on the [`data` branch](../../tree/data): a copy of the public Galactic War data (Major Orders and active campaigns), refreshed about every 10 minutes from the [Helldivers 2 community API](https://github.com/helldivers-2/api). The app reads it only when the community API does not answer.

Format: `{ "v": 2, "at": "<time of the download, ISO 8601>", "assignments": [...], "campaigns": [...] }`, where the two lists are the unmodified answers of `/api/v1/assignments` and `/api/v1/campaigns`.

Not affiliated with Arrowhead Game Studios or Sony Interactive Entertainment.
