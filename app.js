const newsContainer = document.querySelector(".news-container");

const createNews = function (news) {
  return new Promise(function (resolve, reject) {
    renderNews(news);
    resolve(news);
  });
};

const displayNews = async function () {
  try {
    const resNews = await fetch(
      `https://api.spaceflightnewsapi.net/v3/articles`
    );

    const newsObj = await resNews.json();
    // const newsArrMapped = newsObj.map(async (news) => await createNews(news));
    // Object.keys(newsObj).map(function (key, index) {
    //   createNews(newsObj[key]);
    // });
    const newsArr = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    console.log(newsObj);
    const newsArrMapped = newsArr.map(
      async (index) => await createNews(newsObj[index])
    );
    const newsLoaded = await Promise.all(newsArrMapped);
    console.log(newsLoaded);
  } catch (err) {
    console.log(err);
  }
};

const getNews = async function () {
  try {
    const resNews = await fetch(
      `https://api.spaceflightnewsapi.net/v3/articles`
    );

    const newsData = await resNews.json();
    console.log(newsData);
    // renderNews(newsData[0]);
    return newsData;
  } catch {}
};

const renderNews = function (data) {
  // const newsDate = convertDate(data.publishedAt);
  const dateFormatted = data.publishedAt.slice(0, 10);
  const newsDate = dateFormat(dateFormatted, "d mmmm, yyyy");

  const html = `
    <div class="news-card">
        <div class="card-image">
          <img class="img-news" src="${data.imageUrl}" alt="" />
        </div>

        <div class="card-body">
            <div class="body-country">${data.newsSite}</div>
            <div class="card-title">
                <a target="_blank" href = "${data.url}"> <h1>${data.title}</h1> </a>
            </div>
            <div class="body-description">
                <h5>${data.summary}</h5>
            </div>
            <div class="body-date">
                <h5>${newsDate}</h5>
            </div>
        </div>
    </div>
`;
  newsContainer.insertAdjacentHTML("afterbegin", html);
  const cardImage = document.querySelector(".card-image");

  // cardImage.style.backgroundImage = `url('${data.imageUrl}')`;
};

const convertDate = (date) => date.format("dddd, mmmm ds, yyyy");
displayNews();
