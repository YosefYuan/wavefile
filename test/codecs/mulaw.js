/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');

describe('16-bit to 8-bit mu-law', function() {
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wav = new WaveFile(
        fs.readFileSync(path + "16-bit-8kHz-noBext-mono.wav"));
    
    wav.toMuLaw();

    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/8bit-mulaw-8kHz-noBext-mono-encoded.wav", wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 20",
            function() {
        assert.equal(wav2.fmtChunkSize, 20);
    });
    it("audioFormat should be 7 (mu-law)",
            function() {
        assert.equal(wav2.audioFormat, 7);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });

    it("blockAlign should be 1",
            function() {
        assert.equal(wav2.blockAlign, 1);
    });
    it("bitsPerSample should be 8",
            function() {
        assert.equal(wav2.bitsPerSample, 8);
    });
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples.length > 0);
    });
});

describe('8-bit mu-Law to 16-bit (mu-Law encoded with WaveFile)', function() {
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wav = new WaveFile(
        fs.readFileSync(path + "/8bit-mulaw-8kHz-noBext-mono-encoded.wav"));

    wav.fromMuLaw();

    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/16bit-8kHz-noBext-mono-decoded-mulaw.wav",
        wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 16",
            function() {
        assert.equal(wav2.fmtChunkSize, 16);
    });
    it("audioFormat should be 1 (PCM)",
            function() {
        assert.equal(wav2.audioFormat, 1);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });

    it("blockAlign should be 2",
            function() {
        assert.equal(wav2.blockAlign, 2);
    });
    it("bitsPerSample should be 16",
            function() {
        assert.equal(wav2.bitsPerSample, 16);
    });
    
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples.length > 0);
    });
});
