import Document, { Html, Head, Main, NextScript } from 'next/document';
// import Script from 'next/script';
class MyDocument extends Document {
  render() {
    return (
      <Html lang="vn">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
          />
          <link rel="shortcut icon" href="/logo.png" />
          <script
            defer
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
          ></script>
          <script
            defer
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
          ></script>
          <script
            defer
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
          ></script>
          <script
            defer
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
