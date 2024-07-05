export function mockLocationHref(url = 'https://domain.com') {
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
    writable: true,
  })
}
