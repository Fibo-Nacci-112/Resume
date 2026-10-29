gsap.registerPlugin(ScrollTrigger, SplitText);

$(document).ready(function () {
  // Smooth scroll with Lenis
  const lenis = new Lenis({
    wheelMultiplier: 0.5,
    prevent: (node) => node.closest(".swiper") !== null,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 3000);
  });

  gsap.ticker.lagSmoothing(1000);
  // Smooth scroll with Lenis

  // Projects section
  gsap.fromTo(
    ".projects_bg",
    {
      maxWidth: "80%",
      borderRadius: "40px",
    },
    {
      maxWidth: "100%",
      borderRadius: "0%",
      scrollTrigger: {
        trigger: ".projects_bg",
        start: "top 90%",
        end: "top 10%",
        scrub: 1,
      },
    },
  );

  // gsap.fromTo(
  //   ".projects_bg_float",
  //   {
  //     y: "30vh",
  //   },
  //   {
  //     y: "-60vh",
  //     scrollTrigger: {
  //       trigger: ".projects_bg",
  //       start: "top 90%",
  //       end: "top -40%",
  //       scrub: 1,
  //       markers: true,
  //     },
  //   },
  // );

  const $projttl = $(".projects_ttl");
  const $projPara = $(".projects_para");

  const $splitProjttl = new SplitText($projttl, { type: "chars" });
  const $splitSubProjttl = new SplitText($projPara, { type: "chars" });

  const projTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".projects_sect",
      start: "top 40%",
      end: "top -30%",
      scrub: 1,
    },
  });

  projTimeline.fromTo(
    $splitProjttl.chars,
    {
      x: () => gsap.utils.random(-100, 100),
      y: () => gsap.utils.random(-100, 100),
      z: () => gsap.utils.random(-100, 100),
      rotationY: () => gsap.utils.random(-180, 180),
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      z: 0,
      rotationY: 0,
      opacity: 1,
    },
  );
  projTimeline.fromTo(
    $splitSubProjttl.chars,
    {
      x: () => gsap.utils.random(-150, 150),
      y: () => gsap.utils.random(-150, 150),
      z: () => gsap.utils.random(-150, 150),
      rotationY: () => gsap.utils.random(-180, 180),
      opacity: gsap.utils.random(0, 0.6),
    },
    {
      x: 0,
      y: 0,
      z: 0,
      rotationY: 0,
      opacity: 1,
    },
    0,
  );
  // Projects section

  //

  // Horizontal Scroll
  

  const horiTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hori_sect",
      start: "top 70px",

      end: () =>
        "+=" +
        (document.querySelector(".hori_scroll").scrollWidth -
          window.innerWidth),

      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  horiTimeline.to(".hori_scroll", {
    x: () =>
      -(document.querySelector(".hori_scroll").scrollWidth - window.innerWidth),
    ease: "none",
  });

  horiTimeline.to(
    ".hori_ttl",
    {
      x: () =>
        document.querySelector(".hori_scroll").scrollWidth - window.innerWidth,
      ease: "none",
    },
    0,
  );
  const el = document.querySelector(".rect_path");
  const computedFontSize = parseFloat(window.getComputedStyle(el).fontSize);
  const containerWidth = el.clientWidth - (0.55 * computedFontSize);

  horiTimeline.to(".rect_move", {
    x: () => {
      return containerWidth;
    },
    ease: "none"
  }, 0);
  // Horizontal Scroll

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});
