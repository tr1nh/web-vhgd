fetchSheet.fetch({
  gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
  wSheetName: "posts",
}).then((rows) => {
  let postHtml = "";

  rows.forEach((row) => {
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

fetchSheet.fetch({
  gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
  wSheetName: "timeline",
}).then((rows) => {
  let timelineHtml = "";
  rows.forEach((row) => {
    timelineHtml += `
    <div class="py-3 col-lg-4 col-md-8 col-sm-10">
      <div
        class="h-100 single_pricing text-center pricing_color_1 wow fadeInUp"
        data-wow-duration="1.3s"
        data-wow-delay="0.2s"
        style="border-top: 3px solid #00a873">
        <div class="pricing_top_bar">
          <h4 class="title" style="color: #00a873">Ngày</h4>
          <span class="price" style="color: #00a873">${row.date}</span>
        </div>
        <div class="pricing_list px-4 text-left">
          <ul>
    `;

    row.detail.split("\n").forEach((detail) => {
      try {
      let target = /([^:-]*): (.*)/g.exec(detail);
      let time = target[1];
      let evnt = target[2];

      timelineHtml += `<li><strong style="color: #00a873">${time}:&nbsp;</strong>${evnt}</li>`;
      } catch (error) {}
    });

    timelineHtml += `</ul></div></div></div>`;
  });

  document.querySelector("#timeline").innerHTML = timelineHtml;
});
