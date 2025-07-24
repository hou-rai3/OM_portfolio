$(function() {
  // Scrollifyライブラリを初期化
  $.scrollify({
    section : ".container",
    scrollSpeed: 1000,
    easing: "easeOutExpo",
    scrollbars: true,
    setHeights: true,
    updateHash: true,
    touchScroll: true,
    
    // スクロール前に実行される関数
    before: function(i, panels) {
      // ▼▼▼ 修正部分 ▼▼▼
      // アニメーション中の意図しない連続スクロールを防ぐため、一時的にスクロールを無効化する
      $.scrollify.disable();

      // ナビゲーションのハイライト処理
      var ref = panels[i].attr("data-section-name");
      $(".global_nav_item a").removeClass("active");
      $('.global_nav_item a[href="#' + ref + '"]').addClass("active");
    },
    
    // ▼▼▼ 修正部分 ▼▼▼
    // スクロール完了後に実行される関数
    after: function() {
      // スクロール機能を再度有効化する
      $.scrollify.enable();
    },
    
    // ページ読み込み完了時に実行される関数
    afterRender: function() {
      // 最初のセクションにアクティブクラスを付与
      $('.global_nav_item a[href="#header"]').addClass("active");
      
      // ▼▼▼ 修正部分 ▼▼▼
      // 読み込み完了後、スクロールを有効化する（初期化時に無効になっている場合があるため）
      $.scrollify.enable();
    }
  });

  // ナビゲーションリンクをクリックした時に、該当セクションへ移動する
  $(".global_nav_item a").on("click", function(e) {
    e.preventDefault();
    $.scrollify.move($(this).attr("href"));
  });
});