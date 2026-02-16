Page({
  data: {
    basePrice: 5,
    totalPrice: '5.00',
    shippingType: 'hospital',
    phone: '',
    addons: [
      { label: '加里脊', value: 'tenderloin', price: 2, priceText: '+￥2', icon: '🥩' },
      { label: '加火腿', value: 'ham', price: 2, priceText: '+￥2', icon: '🍖' },
      { label: '加芝士', value: 'cheese', price: 3, priceText: '+￥3', icon: '🧀' },
      { label: '多放辣', value: 'extraSpicy', price: 0, priceText: '+￥0', icon: '🌶️' },
      { label: '不要葱', value: 'noScallion', price: 0, priceText: '+￥0', icon: '🧅' }
    ],
    selectedAddons: [],
    selectedAddonsMap: {}
  },

  onSwitchType(event) {
    const { type } = event.currentTarget.dataset;
    this.setData({
      shippingType: type
    });
  },

  onAddonChange(event) {
    const selectedValues = event.detail.value || [];
    const selectedMap = {};

    selectedValues.forEach((value) => {
      selectedMap[value] = true;
    });

    const addonPrice = this.data.addons.reduce((sum, addon) => {
      if (selectedMap[addon.value]) {
        return sum + addon.price;
      }
      return sum;
    }, 0);

    const total = this.data.basePrice + addonPrice;

    this.setData({
      selectedAddons: selectedValues,
      selectedAddonsMap: selectedMap,
      totalPrice: total.toFixed(2)
    });
  },

  onPhoneInput(event) {
    this.setData({
      phone: event.detail.value
    });
  },

  onSubmit() {
    wx.showToast({
      title: '订单模拟发送成功',
      icon: 'success'
    });
  }
});
