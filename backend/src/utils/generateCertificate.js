const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

// console.log(path.join(__dirname, 'public', 'certificateTemplate.html'))


async function generateCertificate(user) {
  try {
   const templatePath = path.resolve(__dirname, '../../public/certificateTemplate.html');
if (!fs.existsSync(templatePath)) {
  throw new Error('Template file not found at: ' + templatePath);
}

    const html = fs.readFileSync(templatePath, 'utf8');

    const filledHtml = html
      .replace('{{name}}', user.name || '')
      .replace('{{email}}', user.email || '')
      .replace('{{date}}', new Date().toLocaleDateString());

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(filledHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    fs.writeFileSync(`./test-${user.name}.pdf`, pdfBuffer);

    return pdfBuffer;
  } catch (err) {
    fs.unlink(`./test-${user.name}.pdf`);

    console.error('Error in generateCertificate:', err);
    throw err;
  }
}

module.exports = generateCertificate;