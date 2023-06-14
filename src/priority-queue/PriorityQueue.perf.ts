import {PriorityQueue} from '~/src'

describe('priority-queue > PriorityQueue', function () {
  this.timeout(60 * 60 * 1000)

  it('1 million', async function () {
    const queue = new PriorityQueue()

    const promises = Array.from({length: 3000000}, (_, i) => {
      // return queue.run(() => {
        // return null
        // return new Promise(resolve => setTimeout(resolve, 0))
        let resolve
        const promise = new Promise(_resolve => {
          resolve = _resolve
        })
        resolve(null)
      // })
    })

    await Promise.allSettled(promises)

    console.log('COMPLETED')
  })
})
