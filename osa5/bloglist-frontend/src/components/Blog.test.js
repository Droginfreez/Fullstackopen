import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('stuff', () => {
  const title = 'test'
  const author = 'test'
  const url = 'www.test.com'
  const likes = 1

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const mockUpdate = jest.fn()

  test('renders content', () => {
    const component = render(<Blog blog={blog}/>)
    
    expect(component.container).toHaveTextContent(title)
    expect(component.container).toHaveTextContent(author)
    expect(component.container.url).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
  })
  
  test('renders content when toggled', () => {
    const component = render(<Blog blog={blog}/>)
  
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('www.test.com')
    expect(component.container).toHaveTextContent('1')
  })

  test('liked twice = called twice', () => {
    const component = render(<Blog blog={blog} updateBlog={mockUpdate}/>)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})

test('BlogForm updates on onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog}/>)
  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: {value: 'test sentence'}
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test sentence')
})