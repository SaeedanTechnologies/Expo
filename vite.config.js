// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// // export default defineConfig({
// //   plugins: [react()],
// //   resolve: {
// //     alias: {
// //       'date-fns/_lib/format/longFormatters': path.resolve(__dirname, 'node_modules/date-fns/_lib/format/longFormatters.js'),
// //     },
// //   },
// // });
// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';
// // import path from 'path';

// // // https://vitejs.dev/config/

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       'date-fns/_lib/format/longFormatters': path.resolve(__dirname, 'node_modules/date-fns/_lib/format/longFormatters.js'),
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'date-fns/_lib/format/longFormatters': path.resolve(__dirname, 'node_modules/date-fns/_lib/format/longFormatters.js'),
    },
  },
});
