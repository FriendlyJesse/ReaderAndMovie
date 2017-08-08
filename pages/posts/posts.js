// 引入 posts 的数据
import {posts, swiper} from '../../data/posts_data.js';

// 初始化 Page
Page
({
    data: 
    {
        posts,
        swiper
    },
    toDetail(event)
    {
        let id = event.currentTarget.dataset.postid;

        wx.navigateTo
        ({
            url: 'posts_detail/posts_detail?id=' + id
        })
    }
})