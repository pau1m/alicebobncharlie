'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const series = require('async/series')
const IPFS = require('ipfs')

/*
 * Create a new IPFS instance, using default repo (fs) on default path (~/.ipfs)
 */


 // So we would want to connect upstream... We need some kind of public private key thing
 // going on.
const ipfsNode = new IPFS({
  repo: path.join(os.tmpDir() + '/' + new Date().toString()),
  EXPERIMENTAL: {
    pubsub: false
  }
})

const fileToAdd = {
  path: 'hello.txt',
  content: fs.createReadStream('./hello.txt')
}

let fileMultihash

series([
  /*
   * Display version of js-ipfs
   */
  (cb) => {
    ipfsNode.version((err, version) => {
      if (err) { return cb(err) }

      console.log('IPFS Version:', version.version)
      cb()
    })
  },
  /*
   * Initialize the repo for this ipfsNode
   */
  (cb) => ipfsNode.init({ emptyRepo: true, bits: 2048 }, cb),
  /*
   * Load the repo config into the IPFS ipfsNode
   */
  (cb) => ipfsNode.load(cb),
  /*
   * Take the ipfsNode online (bitswap, network and so on)
   */
  (cb) => ipfsNode.goOnline(cb),
  /*
   * Add a file to IPFS - Complete Files API on:
   * https://github.com/ipfs/interface-ipfs-core/tree/master/API/files
   */
  (cb) => {
    if (ipfsNode.isOnline()) {
      console.log('\nipfsNode is now ready and online')
    }

    ipfsNode.files.add(fileToAdd, (err, result) => {
      if (err) { return cb(err) }

      console.log('\nAdded file:')
      console.log(result[0])
      fileMultihash = result[0].hash
      cb()
    })
  },
  /*
   * Awesome we've added a file so let's retrieve and
   * display its contents from IPFS
   */
  (cb) => {
    ipfsNode.files.cat(fileMultihash, (err, stream) => {
      if (err) { return cb(err) }

      console.log('\nFile content:')
      stream.pipe(process.stdout)
      stream.on('end', process.exit)
    })
  }
], (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Success!')
})
