const app = getApp();

Page
({
    data:
    {

    },
    onLoad()
    {
        const inTheaters = app.globalData.doubanBase + '/v2/movie/in_theaters',
              comingSoon = app.globalData.doubanBase + '/v2/movie/coming_soon',
              top250 = app.globalData.doubanBase + '/v2/movie/top250';

        this.getMovieListData(inTheaters);
        this.getMovieListData(comingSoon);
        this.getMovieListData(top250);
    },
    getMovieListData(url)
    {
        let _this = this;
        wx.request
        ({
            url: url,
            data:
            {
                start: 0,
                count: 3
            },
            header:
            {
                'content-type': 'json' //小程序里默认的 JSON 方式无法请求，此方案解决。
            },
            success: function(res)
            {
                _this.processDoubanData(res.data);
            }
        })
    },
    processDoubanData(movie)
    {
        let movies = [];
        for (let i in movie.subjects)
        {
            let subject = movie.subjects[i],
                title = subject.title;
            if (title.length >= 6) title = title.substring(0, 6) + '...';

            var temp =
            {
                title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            };
            movies.push(temp);
        }
        this.setData
        ({
            movies
        })
    }
})