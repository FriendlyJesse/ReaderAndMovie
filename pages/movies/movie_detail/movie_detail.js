import {convertToCastInfos, convertToCastString, calcStars, http} from '../../../utils/util';
const app = getApp();

Page
({
    data:
    {
        movie: {}
    },
    onLoad(options)
    {
        let url = app.globalData.doubanBase + '/v2/movie/subject/' + options.id;
        http(url, this.processDoubanData)
    },
    processDoubanData(data)
    {
        // 数据处理
        let director =
        {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null)
        {
            if (data.directors[0].avatars != null)
            {
                director.avatar = data.directors[0].avatars.large;
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        let movie =
        {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: calcStars(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: convertToCastString(data.casts),
            castsInfo: convertToCastInfos(data.casts),
            summary: data.summary
        }
        // 设置数据
        this.setData
        ({
            movie
        })
    },
    viewMoviePostImg: function (e)
    {
        /*查看图片*/
        var src = e.currentTarget.dataset.src;
        wx.previewImage
        ({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    },
})
