import React from 'react'
import Header from '../pages/Header/Header'
import Footer from '../pages/Footer/Footer'
import WordCard from '../pages/MainPage/WordCard'
import { mount, render, shallow } from 'enzyme'
import { Score } from '../pages/GamesPage/Sprint/components/Score/Score'

const anyScore = '20';

const setUpHeader = (props) => shallow(<Header {...props} />)

test('Rendered Header have container element', () => {
  const component = setUpHeader()
  const container = component.find('.header_container')
  expect(container).toBeDefined()
})

test('Verify footer snapshot', () => {
  const component = render(<Footer />)
  expect(component).toMatchSnapshot();
})

test('Score of sprint will show props value', () => {
  const component = mount(<Score score={anyScore} />)
  const wordName = component.find('.score-block')
  expect(wordName.text()).toMatch(anyScore);
})