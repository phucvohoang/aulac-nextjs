import Head from 'next/head';

const CustomHead = (props) => {
  const { title, description, image } = props;
  return (
    <Head>
      <title>{title || 'Âu Lạc Shop'}</title>
      <meta property="og:image" content={image || '/assets/logo-2x.png'} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          description ||
          'Thực Phẩm Chay Âu Lạc, chuyên cung cấp các sản phẩm chay chất lượng và uy tín'
        }
      />
    </Head>
  );
};

export default CustomHead;
