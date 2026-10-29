/* Header */
#header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-wrp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
  box-shadow: 0 0 10px #ffffff29;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  position: relative;
  overflow: hidden;
}

.header-wrp::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}

.header-wrp::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.3)
  );
}

.header-logo {
  display: block;
  max-width: 200px;
  width: 100%;
}

.header-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-right {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
}

.header-nav ul {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.header-nav a {
  font-size: 18px;
  font-weight: 600;
  padding: 10px 0;
  color: #fff;
  text-decoration: none;
}

.header-nav a:hover {
  transform: scale(1.5);
}

.contact-btn {
  border: 1px solid #fff;
  background-color: transparent;
  padding: 8px 30px 8px 20px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: 0.02em;
  color: #fff;
  border-radius: 100vmax;
}

.hamburger {
  display: none;
}
/* Header end */