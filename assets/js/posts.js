function parseCsv(data) {
  let rows = data
    .slice(1, data.length - 1)
    .split(/\"\n\"/)
    .map((row) => row.split('","'));

  let header = rows.splice(0, 1)[0];
  header = header.reduce((a, c, i) => ({ ...a, [c]: i }), {});

  return { header, rows };
}

function array2Json(data, map) {
  return data.map((row) =>
    row.reduce((a, c, i) => ({ ...a, [Object.keys(map)[i]]: row[i] }), {})
  );
}

async function fetchWSheet({ gSheetId, wSheetName, range, query }) {
  let url = "https://docs.google.com/spreadsheets/d/";
  url += `${gSheetId}/gviz/tq?tqx=out:csv`;

  if (wSheetName) url += `&sheet=${wSheetName}`;
  if (range) url += `&range=${range}`;
  if (query) url += `&tq=${query}`;

  let response = await fetch(url);

  if (response.status != 200) return [];

  let body = await response.text();
  let { header, rows } = parseCsv(body);

  return array2Json(rows, header);
}

fetchWSheet({
  gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
}).then((rows) => {
  let postHtml = "";

  rows.forEach(row => {
    postHtml += `
      <div class="col-lg-4 col-md-8">
        <div class="single_blog blog_1 mt-30 wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">
          <div class="blog_image">
            <img src="${row.imageUrl}" alt="blog" />
          </div>
          <div class="blog_content">
            <div class="blog_meta d-flex justify-content-between">
              <div class="meta_date">
                <span>${row.createdAt}</span>
              </div>
              <div class="meta_like"></div>
            </div>
            <h4 class="blog_title">
              <a target="_blank" href="${row.link}">${row.title}</a>
            </h4>
            <a target="_blank" href="${row.link}" class="main-btn">Xem Thêm</a>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector("#blog-items").innerHTML = postHtml;
});
