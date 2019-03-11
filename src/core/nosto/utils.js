export const reloadNosto = () => {
  if (!window.nostojs.q) {
    window.nostojs = (cb) => {
      (window.nostojs.q = window.nostojs.q || [])
      .push(cb);
    };
  }

  window.nostojs(api => api.loadRecommendations());
  if (window.nosto && window.nosto.toolbar && window.nosto.toolbar.reload) {
    window.nosto.toolbar.reload();
  }
};
