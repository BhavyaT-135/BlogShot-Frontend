import './post.css'
import scenery from '../../assets/scenery.jpg'
import {Link} from 'react-router-dom'

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='post'>
      <img
        className='postImg'
        src={(post.photo) ? PF + post.photo : scenery}
        alt=''
      />
      <div className='postInfo'>
        <div className='postCats'>
          {post.categories.map(c => (
            <span className='postCat'>{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
            <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className='postDesc'>{post.desc}</p>
    </div>
  )
}
