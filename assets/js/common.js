$(document).ready(function() {
  // SCROLL TO TOP ON REFRESH
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Force scroll to top immediately when the page loads
  window.scrollTo(0, 0);

  splitName = new SplitText(".header_name", { type: "chars" });
  function duplicateCharacters(splitInstance) {
    splitInstance.chars.forEach((char) => {
      const letter = char.textContent;
      // Produces: Letter <br> Letter <br> Letter
      char.innerHTML = `${letter}<br>${letter}<br>${letter}`;
    });
  }
  console.log(splitName.chars);

  duplicateCharacters(splitName);

  const nameTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });

  nameTimeline
    .to(splitName.chars, {
      y: "-3em",
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.inOut",
    })
    .set(splitName.chars, { y: "0em" }); //resets back to initial state



  const headerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".header_trigger",
      start: "bottom 95%",
      end: "bottom 20%",
      scrub: 1,
    },
  });

  headerTimeline
    .to(".header_left", {
      top: "50%",
      left: "20px",
      gap: "20px",
      x: 0,
      yPercent: -50,
      xPercent: 0,
    })
    .to(
      ".header_right",
      {
        top: "50%",
        right: "20px",
        yPercent: -50,
        x: 0,
      },
      0,
    )
    .to(
      ".header_logo",
      {
        width: "70px",
        height: "70px",
      },
      0,
    )
    .to(
      ".header_name",
      {
        fontSize: "24px",
      },
      0,
    );

  const $html = {
    title: "HTML",
    paragraph:
      "As HTML is the very fundamental thing for web development, I have used it in all 60 of the projects I've laid my hands on.",
  };

  const $css = {
    title: "CSS",
    paragraph:
      "I've been building websites that are responsive, interactive, visually appealing and seamless using css. I've worked on 42 responsive websites, and 7 animation websites using keyframes. Also, I make sure the code i wrote run across all browsers.",
  };

  const $javascript = {
    title: "JavaScript",
    paragraph:
      "I've been working with javascript for 2 years now. I use not just the fundamentals. I use es6 features as well.",
  };

  const $git = {
    title: "Git",
    paragraph:
      "I use Git for version control to track code changes, collaborate seamlessly, and manage project history efficiently.",
  };

  const $wordpress = {
    title: "WordPress",
    paragraph:
      "I build custom, user-friendly WordPress sites and manage themes to deliver functional content management solutions.",
  };

  const $gsap = {
    title: "GSAP",
    paragraph:
      "I use GreenSock (GSAP) to create high-performance, smooth, and complex animations that elevate user experience.",
  };

  const $others = {
    title: "Other Tools",
    paragraph:
      "I am familiar with various auxiliary tools and workflows that streamline modern web development.",
  };

  const $detailDisplay = $(".tools_detail");

  // Keep track of active instances outside the function to clean them up on re-trigger
  let currentTimeline = null;
  let splitTitle = null;
  let splitPara = null;

  function updateToolDetail() {
    const $activeBtn = $(".tools_slide.swiper-slide-active");
    const toolKey = $activeBtn.data("tool");

    let title, paragraph, proficiencyHeight, barColor;

    // Assign content, height, percentage, and official brand colors for each tool
    switch (toolKey) {
      case "html":
        title = $html.title;
        paragraph = $html.paragraph;
        proficiencyHeight = "70%";
        barColor = "#E34F26";
        break;
      case "css":
        title = $css.title;
        paragraph = $css.paragraph;
        proficiencyHeight = "80%";
        barColor = "#1572B6";
        break;
      case "javascript":
      case "js":
        title = $javascript.title;
        paragraph = $javascript.paragraph;
        proficiencyHeight = "60%";
        barColor = "#F7DF1E";
        break;
      case "git":
        title = $git.title;
        paragraph = $git.paragraph;
        proficiencyHeight = "75%";
        barColor = "#F05032";
        break;
      case "wordpress":
        title = $wordpress.title;
        paragraph = $wordpress.paragraph;
        proficiencyHeight = "85%";
        barColor = "#21759B";
        break;
      case "gsap":
        title = $gsap.title;
        paragraph = $gsap.paragraph;
        proficiencyHeight = "90%";
        barColor = "#88CE02";
        break;
      case "others":
        title = $others.title;
        paragraph = $others.paragraph;
        proficiencyHeight = "50%";
        barColor = "#64748B";
        break;
      default:
        title = "Lorem, ipsum.";
        paragraph =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit...";
        proficiencyHeight = "0%";
        barColor = "#000000";
    }

    // 1. CLEAN UP: Kill any running timeline and revert old SplitText wrappers
    if (currentTimeline) currentTimeline.kill();
    if (splitTitle) splitTitle.revert();
    if (splitPara) splitPara.revert();

    // 2. Cache elements and update HTML content
    const $title = $detailDisplay.find(".tools_detail_ttl").html(title);
    const $para = $detailDisplay.find(".tools_detail_para").html(paragraph);
    const barEl = $detailDisplay.find(".proficiency_bar")[0];
    const $percentageDisplay = $detailDisplay.find(".proficiency_percentage");

    // Extract the numeric value from proficiencyHeight (e.g., "70%" -> 70)
    const targetValue = parseInt(proficiencyHeight, 10);
    const counterObj = { val: 0 };

    // 3. Create fresh SplitText instances on the clean HTML
    splitTitle = new SplitText($title, { type: "chars" });
    splitPara = new SplitText($para, { type: "chars" });

    // 4. Run a fresh GSAP timeline (Animates bar, counter, and text simultaneously)
    currentTimeline = gsap
      .timeline()
      // Animate the bar height and color from 0%
      .fromTo(
        barEl,
        { height: "0%", backgroundColor: "#8a8a8a80" },
        {
          height: proficiencyHeight,
          backgroundColor: barColor,
          duration: 1,
          ease: "power2.inOut",
        },
      )
      // Animate the percentage number counting up from 0 to the target value
      .to(
        counterObj,
        {
          val: targetValue,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: function () {
            $percentageDisplay.text(Math.round(counterObj.val) + "%");
          },
        },
        0,
      ) // The "0" ensures it starts at the exact same time as the bar animation
      // Animate title text
      .fromTo(
        splitTitle.chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, stagger: 0.1, ease: "power1.inOut" },
        "-=0.3",
      )
      // Animate paragraph text
      .fromTo(
        splitPara.chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, stagger: 0.02, ease: "power1.inOut" },
        "-=0.3",
      );
  }

  const swiper = new Swiper(".tools-swiper", {
    direction: "vertical",
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    mousewheel: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },

    on: {
      click: function (swiper) {
        const realIndex = swiper.clickedSlide.getAttribute(
          "data-swiper-slide-index",
        );

        swiper.slideToLoop(Number(realIndex));
      },
      slideChangeTransitionEnd: updateToolDetail,
    },
  });
});