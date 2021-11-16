import CryptoJS from 'crypto-js';

const md5FromFile = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = (fileEvent: any) => {
    const binary = CryptoJS.lib.WordArray.create(
      fileEvent.target.result,
    );
    const md5 = CryptoJS.MD5(binary);
    resolve(md5);
  };
  /* eslint-disable prefer-promise-reject-errors */
  reader.onerror = () => {
    reject('oops, something went wrong with the file reader.');
  };

  reader.readAsArrayBuffer(file);
});

const fileChecksum = async (file: any) => {
  const md5: any = await md5FromFile(file);
  return md5.toString(CryptoJS.enc.Base64);
};

export default fileChecksum;
