## redux-form-v5

- Completely blows frame budget with 300 fields on iPad Air 1. Blows it slightly on Core 2 Duo laptop.
- With a more realistic number fields, ~40, frame rate can be kept at 60fps on Core 2 Duo and close
to on iPad Air 1.
- Adding validation kills it as it has to validate every field at once, ultimately mimicing the work happening during render.

// Dev
npm start

// Release
CLIENT_ENV=production npm run build && npm run serve
