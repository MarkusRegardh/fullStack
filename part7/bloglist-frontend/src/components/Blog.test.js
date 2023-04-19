import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

test("renders correct content", () => {
  const blog = {
    title: "How to write tests",
    url: "www.test.com",
    author: "teppo testi",
    likes: 123,
    user: {
      name: "teppo",
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector(".blog")
  expect(div).toHaveTextContent("How to write tests")
  expect(div).toHaveTextContent("teppo testi")
  expect(div).not.toHaveTextContent("123")
  expect(div).not.toHaveTextContent("www.test.com")
})

test("renders correct content after press of view button", async () => {
  const blog = {
    title: "How to write tests",
    url: "www.test.com",
    author: "teppo testi",
    likes: 123,
    user: {
      name: "teppo",
    },
  }

  const user = {
    name: "teppo",
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const mockUser = userEvent.setup()
  const button = screen.getByText("view")
  await mockUser.click(button)

  const div = container.querySelector(".blog")
  expect(div).toHaveTextContent("How to write tests")
  expect(div).toHaveTextContent("teppo testi")
  expect(div).toHaveTextContent("123")
  expect(div).toHaveTextContent("www.test.com")
})

test("Clicking like twice calls event handler twice", async () => {
  const blog = {
    title: "How to write tests",
    url: "www.test.com",
    author: "teppo testi",
    likes: 123,
    user: {
      name: "teppo",
    },
  }

  const mockHandler = jest.fn()

  const user = {
    name: "teppo",
  }

  const { container } = render(
    <Blog blog={blog} user={user} incrementLikes={mockHandler} />
  )

  const mockUser = userEvent.setup()
  const button = screen.getByText("view")
  await mockUser.click(button)

  const likeButton = screen.getByText("Like")
  await mockUser.click(likeButton)
  await mockUser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
