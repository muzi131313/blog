var ghPages = require('gh-pages')

ghPages.publish('./docs/.vuepress/dist', function(error) {
  if (error) {
    console.log(error)
  }
})
