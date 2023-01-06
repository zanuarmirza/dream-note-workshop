import Card from './components/Card'
import ModalInput from './components/ModalInput'
import { motion, AnimatePresence } from 'framer-motion'
import useToggle from './components/useToggle'
import { useLocalStorage } from './storage/LocalStorage'
import clsx from 'clsx'
// eslint-disable-next-line no-unused-vars
const MOCK_DATA = [
  {
    id: 1,
    complete: false,
    content:
      'I need to save my money 1 million IDR every month to buy PC with RTX 3080',
  },
  {
    id: 2,
    complete: false,
    content: 'I want to travel to japan',
  },
  {
    id: 3,
    complete: false,
    content: 'I want to be more discipline at using time',
  },
  {
    id: 4,
    complete: false,
    content: 'Get my first 100 million at 2023',
  },
]
const ListCard = ({ data, onDelete, onComplete }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      <AnimatePresence>
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              ease: [0.16, 1, 0.3, 1],
              duration: 0.6,
              delay: 0.5,
              opacity: { duration: 0.8, ease: 'easeOut' },
            }}
            exit={{
              opacity: 0,
              transition: { delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            }}
            layout
          >
            <Card
              isComplete={item.complete}
              onDelete={() => onDelete(index)}
              onComplete={() => onComplete(index)}
            >
              {item.content}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function App() {
  const { active, setActive } = useToggle()
  const [values, setValues] = useLocalStorage('dream-note', [])
  const isDreamEmpty = !values.length
  const addNewDream = (data) => {
    setValues((prev) => [
      ...prev,
      {
        content: data,
        complete: false,
        id: values.length ? values[values.length - 1].id + 1 : 1,
      },
    ])
  }

  const deleteDream = (index) => {
    setValues([...values.slice(0, index), ...values.slice(index + 1)])
  }

  const completeDream = (completeIndex) => {
    setValues(
      values.map((item, index) =>
        index === completeIndex ? { ...item, complete: true } : item
      )
    )
  }

  const submitHandler = (data) => {
    addNewDream(data)
    setActive(false)
  }
  const content = isDreamEmpty ? (
    <>
      <p className="font-jakarta text-white text-2xl text-center">
        Kamu belum menulis mimpi mu
      </p>
      <button className="btn mt-5" onClick={() => setActive(true)}>
        Buat Mimpi pertamamu
      </button>
    </>
  ) : (
    <>
      <header className="text-center flex justify-center mt-44">
        <h1 className="font-jakarta text-8xl font-semibold dark:text-white mb-10">
          Saya Ingin . . .
        </h1>
      </header>
      <div className="flex flex-col max-w-4xl w-full mx-auto sm:px-10">
        <button className="btn" onClick={() => setActive(true)}>
          + Mimpi
        </button>
        <ListCard
          data={values}
          onDelete={deleteDream}
          onComplete={completeDream}
        />
      </div>
    </>
  )

  return (
    <div
      className={clsx(
        'min-h-screen flex flex-col dark:bg-zinc-900 items-center',
        { 'justify-center': isDreamEmpty }
      )}
    >
      {content}
      <ModalInput
        isOpen={active}
        onSubmit={submitHandler}
        onClose={() => setActive(false)}
      />
    </div>
  )
}

export default App
