'use strict'
let superagent = require('superagent')
let mailer = require('./mailer.js')

let url = 'http://news-at.zhihu.com/api/4/news/latest'
let id = 0

let makeHtml = (props) => {
	let html = props.map(function(value, index){
		return `<a href = 'http://daily.zhihu.com/story/${value.id}'><b>${value.title}</b></a>`
	})
	return html.join('</br></br>')
}

let pushNews = () => {
	superagent.get(url).end(function(err, sres){
		if(err){
			console.log( 'Oh no! err: ' + err )
		}
		else{
			if(id != sres.body.stories[0].id){

				let m = mailer({html: makeHtml(sres.body.stories.slice(0, 5))} )
				m.sendMail()
				id = sres.body.stories[0].id
			}
		}
	})
}

setInterval(pushNews, 10000)
