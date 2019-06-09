exports.plugins = [
  require('remark-preset-lint-recommended'),
  require('remark-frontmatter')
]

exports.settings = {
  lint-list-item-indent: 'space',
  ordered-list-marker-value: 'one'
}
