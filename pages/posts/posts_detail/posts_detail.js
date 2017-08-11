// 引入 posts 的数据
import {posts} from '../../../data/posts_data.js';
const app = getApp();  //调用全局

// 初始化 Page
Page
({
    data:
    {
        postId: null,
        isPlay: false
    },
    onLoad(option)
    {
        // 文章id
        let postId = option.id;
        // 导入数据
        this.setData
        ({
            postId,
            postData: posts[postId]
        })

        // 文章收藏
        this.collection();

        // 音乐播放
        this.music();
    },
    onAudio()
    {
        if (this.data.isPlay)
        {
            wx.pauseBackgroundAudio()
        }
        else
        {
            var music = posts[this.data.postId].music;
            wx.playBackgroundAudio
            ({
                dataUrl: music.url,
                title: music.title,
                coverImgUrl: music.coverImg
            })
        }
        // 反转
        this.setData
        ({
            isPlay: !this.data.isPlay
        })
    },
    onCollection()
    {
        let postsCollected = wx.getStorageSync('postsCollectioned'),
            postCollected = !postsCollected[this.data.postId];  //文章数据反转

        postsCollected[this.data.postId] = postCollected; //将文章数据存入整体数据
        // 更新缓存
        wx.setStorageSync('postsCollectioned', postsCollected)
        // 更新数据变量
        this.setData
        ({
            collected: postCollected
        })
        // 消息框
        wx.showToast
        ({
            title: postCollected ? '收藏成功' : '取消成功',
            icon: 'success',
            duration: 1000
        })
    },
    onShare()
    {
        wx.showActionSheet
        ({
            itemList:
            [
                '分享给微信好友',
                '分享到朋友圈',
                '分享到QQ',
                '分享到微博'
            ]
        })
    },
    collection()
    {
        let postsCollected = wx.getStorageSync('postsCollectioned');
        if (postsCollected)
        {
            let postCollected = postsCollected[this.data.postId];
            this.setData
            ({
                collected: postCollected
            })
        }
        else
        {
            postsCollected = {};
            postsCollected[this.data.postId] = false;
            wx.setStorageSync('postsCollectioned', postsCollected)
        }
    },
    music()
    {
        var _this = this;
        // 监听播放
        wx.onBackgroundAudioPlay(function()
        {
            _this.setData
            ({
                isPlay: true
            })

            app.globalData.musicPostId = _this.data.postId;
        })
        wx.onBackgroundAudioPause(function()
        {
            _this.setData
            ({
                isPlay: false
            })

            app.globalData.musicPostId = null;
        })

        // 后台播放状态
        wx.getBackgroundAudioPlayerState
        ({
            success: function (option)
            {
                if (option.status == 1 && _this.data.postId == app.globalData.musicPostId)
                {
                    _this.setData
                    ({
                        isPlay: true
                    })
                }
            }
        })
    }
})