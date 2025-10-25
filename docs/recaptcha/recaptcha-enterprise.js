// Lightweight helper around reCAPTCHA Enterprise so buttons/forms can fetch tokens on demand.
(function(global) {
  'use strict';

  const script = document.currentScript;
  const siteKey =
    global.__FIREBASE_CONFIG__?.appCheckSiteKey ||
    script?.dataset?.siteKey ||
    global.LockardRecaptchaSiteKey;

  if (!siteKey) {
    console.warn('LockardRecaptcha: Site key not found. Provide appCheckSiteKey or data-site-key.');
    return;
  }

  async function execute(action = 'default') {
    if (!global.grecaptcha || !global.grecaptcha.enterprise) {
      throw new Error('reCAPTCHA Enterprise SDK not available. Include the loader script in <head>.');
    }

    return new Promise((resolve, reject) => {
      global.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await global.grecaptcha.enterprise.execute(siteKey, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  function getElements(target) {
    if (!target) {
      return [];
    }
    if (typeof target === 'string') {
      return Array.from(document.querySelectorAll(target));
    }
    if (target instanceof Element) {
      return [target];
    }
    if (target instanceof NodeList || Array.isArray(target)) {
      return Array.from(target);
    }
    return [];
  }

  function bind(target, action, handler, options = {}) {
    const elements = getElements(target);
    if (!elements.length) {
      console.warn('LockardRecaptcha: No elements found for binding.');
      return;
    }

    const { preventDefault = true } = options;

    elements.forEach((element) => {
      element.addEventListener('click', async (event) => {
        try {
          if (preventDefault) {
            event.preventDefault();
          }
          const token = await execute(action);
          await handler(token, event);
        } catch (error) {
          console.warn('LockardRecaptcha: Action blocked by reCAPTCHA.', error);
        }
      });
    });
  }

  global.LockardRecaptcha = {
    execute,
    bind
  };
})(window);
