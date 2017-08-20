import {calcStars, http} from '../../../utils/util';
const app = getApp();

Page
({
    data:
    {
        movies: [],
        requestUrl: '',
        tatolCount: 0
    },
    onLoad(options)
    {
        // 动态设置标题
        wx.setNavigationBarTitle
        ({
            title: options.category
        })

        let dataUrl = '';
        switch (options.category)
        {
            case '正在热映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=21';
                break;
            case '即将上映':
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=21';
                break;
            case '豆瓣 Top250':
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=21';
                break;
        }
        this.data.requestUrl = dataUrl;
        http(dataUrl, this.processDoubanData);
    },
    onScrolltolower()
    {
        // 下拉加载下一组数据
        let nextUrl = this.data.requestUrl + '?start=' + this.data.tatolCount + '&count=' + this.data.tatolCount + 21;
        http(nextUrl, this.processDoubanData)
        wx.showLoading
        ({
            title: '加载中'
        })
    },
    processDoubanData(moviesDouban)
    {
        let movies = [];
        moviesDouban.subjects.forEach(function(el)
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
        });

        let totalMovies = this.data.tatolCount ? this.data.movies.concat(movies) : movies;

        this.setData
        ({
            movies: totalMovies,
            tatolCount: this.data.tatolCount + 21
        });
        wx.hideLoading();
        wx.stopPullDownRefresh();
    },
    onPullDownRefresh()
    {
        // 下拉刷新
        let refreshUrl = this.data.requestUrl + '?start=0&count=21';
        http(refreshUrl, this.processDoubanData)
        this.setData
        ({
            movies: [],
            tatolCount: 21
        });
        wx.showLoading
        ({
            title: '加载中'
        });
    }
})