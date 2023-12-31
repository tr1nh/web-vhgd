fetchSheet
  .fetch({
    gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
    wSheetName: "logo",
  })
  .then((rows) => {
    let html = "";

    rows.forEach((row) => {
      html += `
      <img class="participant-logo" src=${row.logoUrl} alt="${row.logoUrl}">
      `;
    });

    document.querySelector("#participant").innerHTML = html;

    $("#participant").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: false,
      nextArrow: false,

      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  });

fetchSheet
  .fetch({
    gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
    wSheetName: "header",
  })
  .then((rows) => {
    let imageUrl = rows[0].imageUrl || "assets/images/header_app.png";
    document.querySelector("#header-app").innerHTML = `
          <div
            class="image wow fadeInRightBig"
            data-wow-duration="1.3s"
            data-wow-delay="1.8s"
          >
            <img src="${imageUrl}" alt="header App" />
            <img src="assets/images/dots.svg" alt="dots" class="dots" />
          </div>
`;
  });

fetchSheet
  .fetch({
    gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
    wSheetName: "gallery",
  })
  .then((rows) => {
    let galleryHtml = "";

    rows.forEach((row) => {
      galleryHtml += `
        <div class="single_slider">
          <img src="${row.imageUrl}" alt="Screen Shot" />
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
      nextArrow:
        '<span class="next"><i class="lni lni-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  });

fetchSheet
  .fetch({
    gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
    wSheetName: "posts",
  })
  .then((rows) => {
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

fetchSheet
  .fetch({
    gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
    wSheetName: "timeline",
  })
  .then((rows) => {
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

fetchSheet
  .fetch({
    gSheetId: "1agAmMH3RN6_dGXSCmjx-HDXDmZBGe7Ia80V7QECrknU",
    wSheetName: "video",
  })
  .then((rows) => {
    document.querySelector("#video iframe").src = rows[0].videoUrl;
  });
