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
        searchPannelShow: false
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
    onBindFocus()
    {
        this.setData
        ({
            searchPannelShow: true
        })
    },
    onBindFirm()
    {

    },
    onImg()
    {
        this.setData
        ({
            searchPannelShow: false
        })
    }
})