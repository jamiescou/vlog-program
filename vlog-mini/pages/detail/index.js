const app = getApp();
Page({
  data: {
    isLoad: true,
    modalName: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    workInfo: {},
    id: '',
    previewList:[]
  },
  onReady(){
    // this.getWorkDetail()
  },
  onLoad: function (opt) {
    this.getWorkDetail(opt.id)
    this.setData({
      id: opt.id
    })
  },
  onShareAppMessage(res) {
    console.log('res=>', res, this.data.id)
    return {
      title: 'VLOG分享吧',
      imageUrl: '',
      path: '/pages/detail/index?id=' + this.data.id
    }
  },
  getWorkDetail(id){
    app.globalData.request.get('/getTag?id=' + id).then(res => {
      if (res.code === 200) {
        let curInfo = res.data
        console.log(curInfo)
        this.setData({
          workInfo: res.data
        })
      }
    })
  },
  previewImage: function(e) {
    var currentList = this.data.previewList;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: currentList
    })
  },
  contact() {
    this.setData({
      modalName: 'DialogModal'
    })
  },
  freeTell(){
    wx.makePhoneCall({
      phoneNumber: '15399998777',
    })
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
});