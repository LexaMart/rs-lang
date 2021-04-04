import React from 'react'
import Header from '../pages/Header/Header'
import Footer from '../pages/Footer/Footer'
import WordCard from '../pages/MainPage/WordCard'
import { mount, render, shallow } from 'enzyme'

const wordMock = {
  "id": "5e9f5ee35eb9e72bc21af4a0",
  "group": 0,
  "page": 0,
  "word": "alcohol",
  "image": "files/01_0002.jpg",
  "audio": "files/01_0002.mp3",
  "audioMeaning": "files/01_0002_meaning.mp3",
  "audioExample": "files/01_0002_example.mp3",
  "textMeaning": "<i>Alcohol</i> is a type of drink that can make people drunk.",
  "textExample": "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
  "transcription": "[ǽlkəhɔ̀ːl]",
  "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
  "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
  "wordTranslate": "алкоголь"
}

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

test('Word card accept props', () => {
  const component = mount(<WordCard element={wordMock} />)
  const wordName = component.find('.word')
  expect(wordName.text()).toBe(wordMock.word)
})