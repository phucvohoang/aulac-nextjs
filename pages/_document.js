import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
          ></script>
          <script
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
          ></script>
          <script
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
          ></script>
          <script
            type="text/javascript"
            src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
