fetchSheet
  .fetch({
    gSheetId: "1ota9L8ZiiQfMo9poZ0rrYfUzT0X8hvnQ8zSSw2W8_ek",
    wSheetName: "sum",
  })
  .then((rows) => {
    let content = {};
    rows.forEach(row => {
      let key = row.section;
      Object(content).hasOwnProperty(key) || Object.assign(content, { [key]: [] });
      content[key].push(row);
    });

    // header
    let header = content.header[0];
    document.querySelector("#home > div.container > div > div > div > h2").innerHTML = header.title ;
    document.querySelector("#home > div.container > div > div > div > div").innerHTML = header.description.replaceAll(/^(.+)$/gm, "<p>$1</p>");
    let headerImageUrl = header.resourceUrl  || "assets/images/header_app.png";
    document.querySelector("#header-app").innerHTML = `
      <div class="image wow fadeInRightBig" data-wow-duration="1.3s" data-wow-delay="1.8s">
        <img src="${headerImageUrl }" alt="header App" />
        <img src="assets/images/dots.svg" alt="dots" class="dots" />
      </div>
    `;

    // about
    let about = content.about[0];
    document.querySelector("#about > div > div > div:nth-child(2) > div > div > h4").innerHTML = about.title ;
    document.querySelector("#about-description").innerHTML = about.description.replaceAll(/^(.+)$/gm, "<p>$1</p>");
    document.querySelector("#about > div > div > div.col-lg-6.col-md-9 > div > img.image").src = about.resourceUrl ;

    // timeline
    let timelineHtml = "";
    content.timeline.forEach((row) => {
      timelineHtml += `
      <div class="py-3 col-lg-4 col-md-8 col-sm-10">
        <div
          class="h-100 single_pricing text-center pricing_color_1 wow fadeInUp"
          data-wow-duration="1.3s"
          data-wow-delay="0.2s"
          style="border-top: 3px solid #00a873">
          <div class="pricing_top_bar">
            <h4 class="title" style="color: #00a873">Ngày</h4>
            <span class="price" style="color: #00a873">${row.eventDate }</span>
          </div>
          <div class="pricing_list px-4 text-left">
            <ul>
    `;

      row.eventDetail .split("\n").forEach((detail) => {
        try {
          let target = /(\d{1,2}\s?(:|giờ|h|g)\s?\d{0,2}( - | đến )?\d{0,2}\s?(:|gio|h|g)?\s?\d{0,2}): (.*)/g.exec(detail);
          let time = target[1];
          let evnt = target[5];

          timelineHtml += `<li><strong style="color: #00a873">${time}:&nbsp;</strong>${evnt}</li>`;
        } catch (error) {
          timelineHtml += `<li>${detail}</li>`;
        }
      });

      timelineHtml += `</ul></div></div></div>`;
    });

    document.querySelector("#timeline").innerHTML = timelineHtml;

    // video
    document.querySelector("#video iframe").src = content.video[0].resourceUrl ;

    // gallery
    let galleryHtml = "";

    content.gallery.forEach((row, i) => {
      galleryHtml += `
        <div class="single_slider">
          <img src="${row.resourceUrl }" alt="Screen Shot ${i}" />
        </div>
      `;
    });

    document.querySelector("#gallery").innerHTML = galleryHtml;

    $(".screenshot_active").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
      responsive: [ { breakpoint: 1200, settings: { slidesToShow: 2, }, }, { breakpoint: 992, settings: { slidesToShow: 3, }, }, { breakpoint: 768, settings: { slidesToShow: 2, }, }, { breakpoint: 576, settings: { slidesToShow: 1, }, }, ],
    });

    // map
    document.querySelector("#download div p img").src = content.map[0].resourceUrl ;

    // testimonial
    let testimonialHtml = "";

    content.testimonial.forEach((row) => (testimonialHtml += `<img class="participant-logo" src="${row.resourceUrl }" alt="${row.resourceUrl }">`));
    document.querySelector("#participant").innerHTML = testimonialHtml;

    $("#participant").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: false,
      nextArrow: false,
      responsive: [ { breakpoint: 992, settings: { slidesToShow: 3, }, }, { breakpoint: 768, settings: { slidesToShow: 2, }, }, { breakpoint: 576, settings: { slidesToShow: 1, }, } ],
    });

    // news
    let postHtml = "";

    content.news.forEach((row) => {
      postHtml += `
      <div class="col-lg-4 col-md-8">
        <div class="single_blog blog_1 mt-30 wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">
          <div class="blog_image">
            <img src="${row.postImageUrl }" alt="blog" />
          </div>
          <div class="blog_content">
            <div class="blog_meta d-flex justify-content-between">
              <div class="meta_date">
                <span>${row.postCreatedAt }</span>
              </div>
              <div class="meta_like"></div>
            </div>
            <h4 class="blog_title">
              <a target="_blank" href="${row.postLink }">${row.postTitle }</a>
            </h4>
            <a target="_blank" href="${row.postLink }" class="main-btn">Xem Thêm</a>
          </div>
        </div>
      </div>
    `;
    });

    document.querySelector("#blog-items").innerHTML = postHtml;

    // footer
    document.querySelector("#footer").outerHTML = content.footer[0].html.replaceAll(/""/g, "\"");
  });
