import {calcStars, http} from '../../utils/util';
const app = getApp();

Page
({
    data:
    {
        title:
        [
            '正在热映',
            '即将上映',
            '豆瓣 Top250'
        ],
        moviesList: [],
        searchPannelShow: false,
        searchResylt: [],
        requestUrl: '',
        tatolCount: 0
    },
    onLoad()
    {
        const inTheaters = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3',
              comingSoon = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3',
              top250 = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';

        http(inTheaters, this.processDoubanData);
        http(comingSoon, this.processDoubanData);
        http(top250, this.processDoubanData);
    },
    onBindFocus()
    {
        this.setData
        ({
            searchPannelShow: true
        })
    },
    onBindFirm(e)
    {
        let searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + e.detail.value;
        this.setData
        ({
            requestUrl: searchUrl
        })
        http(searchUrl, this.processSearch);
    },
    onBindImg()
    {
        this.setData
        ({
            searchPannelShow: false
        })
    },
    processDoubanData(movie)
    {
        let movies = [];
        movie.subjects.forEach(function(el)
        {
            let title = el.title;
            if (title.length >= 6) title = title.substring(0, 6) + '...';

            var temp =
            {
                title,
                stars: calcStars(el.rating.stars),
                average: el.rating.average,
                coverageUrl: el.images.large,
                movieId: el.id
            };
            movies.push(temp);
        })

        // 数据写入
        this.data.moviesList.push(movies);
        // 触发脏检查
        this.setData
        ({
            moviesList: this.data.moviesList
        })
    },
    processSearch(movie)
    {
        let movies = [];
        movie.subjects.forEach(function(el)
        {
            let title = el.title;
            if (title.length >= 6) title = title.substring(0, 6) + '...';

            var temp =
            {
                title,
                stars: calcStars(el.rating.stars),
                average: el.rating.average,
                coverageUrl: el.images.large,
                movieId: el.id
            };
            movies.push(temp);
        })
        let totalMovies = this.data.tatolCount ? this.data.searchResylt.concat(movies) : movies;
        // 触发脏检查
        this.setData
        ({
            searchResylt: totalMovies,
            tatolCount: this.data.tatolCount + 21
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
    },
    onScrolltolower()
    {
        // 下拉加载下一组数据
        let nextUrl = this.data.requestUrl + '&start=' + this.data.tatolCount + '&count=' + (this.data.tatolCount + 21);
        console.log(nextUrl);
        http(nextUrl, this.processSearch)
        wx.showLoading
        ({
            title: '加载中'
        })
    },
})