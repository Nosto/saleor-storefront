const fetch = require("node-fetch");
const base64 = require('base-64');
const argv = require('yargs')
    .usage('Usage: $0 -w [num] -h [num]')
    .alias('s', 'saleor-endpoint')
    .describe('s', 'Saleor endpoint')
    .alias('d', 'nosto-endpoint')
    .describe('d', 'Nosto endpoint')
    .alias('t', 'api-token')
    .describe('t', 'Token for the API')
    .demandOption(['s','d','t'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv;

const query = `
query {
  products(first: 50) {
    edges {
      node {
        id
        name
        description
        collections {
          name
        }
        price {
          amount
          currency
        }
        availability {
          available
          onSale
        }
        url
        images {
          url
        }
        attributes {
          attribute {
            slug
          }
          value {
            slug
          }
        }
        category {
          name
        }
        variants {
          id
          sku
          name
          attributes {
            attribute {
              slug
            }
            value {
              slug
            }
          }
          images {
            url
          }
          price {
            amount
            currency
          }
          stockQuantity
          trackInventory
        }
      }
    }
  }
}
 `

return fetch(argv.s + '/graphql/', {
  method: 'POST',
  headers: {
    "content-type":"application/json",
  },
  body: JSON.stringify({ "query": query })
})
.then(response => response.json())
.then(data => {
  var xx = data.data.products.edges.map(product => {
    return {
      url: 'http://saleor.dev.nos.to' + product.node.url,
      product_id: product.node.id,
      name: product.node.name,
      image_url: product.node.images[0].url.replace("://localhost", "://docker.for.mac.localhost"),
      thumb_url: product.node.images[0].url.replace("://localhost", "://docker.for.mac.localhost"),
      price_currency_code: product.node.price.currency,
      availability: product.node.availability.available,
      categories: [product.node.category.name, product.node.collections.name].filter(category => category != null),
      description: product.node.description,
      price: product.node.price.amount,
      custom_fields: product.node.attributes.reduce((fields, item) => {fields[item.attribute.slug] = item.value.slug; return fields;}, {}),
      alternate_image_urls: product.node.images.map(image => image.url.replace("://localhost", "://docker.for.mac.localhost")),
      skus: product.node.variants.map(variant => {
        return {
          id: variant.id,
          price: variant.price.amount,
          list_price: variant.price.amount,
          url: 'http://saleor.dev.nos.to' + product.node.url,
          image_url: variant.images.length > 0 ? variant.images[0].url.replace("://localhost", "://docker.for.mac.localhost") : product.node.images[0].url.replace("://localhost", "://docker.for.mac.localhost"),
          availability: variant.stockQuantity > 0 ? 'InStock' : 'OutOfStock',
          custom_fields: variant.attributes.reduce((fields, item) => {fields[item.attribute.slug] = item.value.slug; return fields;}, {})
        }
      })
    };
  })

  return JSON.stringify(xx, null, 2);
})
.then(data => {
  return fetch(argv.t + '/api/v1/products/upsert', {
    method: 'POST',
    headers: {
      'authorization': 'Basic ' + Buffer.from(":" + argv.t).toString('base64'),
      "content-type":"application/json",
    },
    body: data
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(e => {
  console.log(e);
})
