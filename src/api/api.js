const api = {
  key: '21111393-6001b1f3c039d334af6d283f7',
  get url() { return `https://pixabay.com/api/?key=${this.key}&image_type=photo&per_page=18&orientation=horizontal` },
};

export default api
