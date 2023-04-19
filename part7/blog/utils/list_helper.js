const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let sum = 0;
    for (const blog of blogs){
        sum += blog.likes
    }
    return sum
}

const favoriteBlog= (blogs) => {
    if (blogs.length > 0){
    let favorite= {};
    let maxLikes = -1;
    for (const blog of blogs){
        if (blog.likes > maxLikes){
            favorite = blog
            maxLikes = blog.likes
        }
    }
    delete favorite.__v
    delete favorite.url
    delete favorite._id
    return favorite
} else {
    return {}
}
}

const mostLikes = (blogs) => {
    if (blogs.length > 0){
        const grouped = _.groupBy(blogs, (blog) => { return blog.author})
        let most
        let amount=0
        for (const [author, value] of Object.entries(grouped)){
            const sum = _.sumBy(value, (blog) => { return blog.likes})
            if (sum > amount){
                most = author
                amount = sum
            }
        }
        return { author: most, likes: amount}
    } else {
        return {}
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length > 0){
        const counts = _.countBy(blogs, (blog) => { return blog.author})
        let most
        let amount=0
        for (const [author, value] of Object.entries(counts)){
            if (value>amount){
                amount = value
                most = author
            }
        }
        return { author: most, blogs: amount}
    } else {
        return {}
    }
}


  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }

