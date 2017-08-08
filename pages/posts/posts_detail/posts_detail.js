// 引入 posts 的数据
import {posts} from '../../../data/posts_data.js';

// 初始化 Page
Page
({
    onLoad(option)
    {
        let postId = option.id;
        this.setData
        ({
            postData: posts[postId]
        })
    }
})