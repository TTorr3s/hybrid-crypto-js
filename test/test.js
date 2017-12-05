'use strict';

var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;

var crypto = require('../lib/crypto');
var helpers = require('../lib/helpers');
import KeyManager from '../lib/keymanager';

describe('KeyManager', function() {

    var options = {
        saveKeys: false,
        keySize: 512,
    }

    var keyManager = new KeyManager(options);
    var keyGenerateTimeout = 2000;
    var keypair;

    // Generate keys before testing
    before(function(done) {
        keyManager.generateKeypair(function(keys) {
            keypair = keys;
            done();
        });
    });

    it('keypair should be object', function() {
        assert.typeOf(keypair, 'object');
    });

    it('keypair\'s public key shoud be object', function() {
        assert.typeOf(keypair.publicKey, 'object');
    });

    it('keypair\'s private key should be object', function() {
        assert.typeOf(keypair.privateKey, 'object');
    });

    it('should convert keys to PEMs', function() {
        var pems = keyManager.keysToPem(keypair);

        // PEMs should be object
        assert.typeOf(pems, 'object');

        // Keys should be strings
        assert.typeOf(pems.publicKey, 'string');
        assert.typeOf(pems.privateKey, 'string');
    });

    it('should convert PEMs to keys', function() {
        var pems = {
            privateKey: '-----BEGIN RSA PRIVATE KEY-----\r\nMIIBOgIBAAJBAIfXJEy0uYHqXjRL70tgvwd+BAOG02HssGy4V/coTXu3zgKtvqcY\r\n4FKnxwVlxrZ3cpsefjzz0Dg6gMAGobUCOQUCAwEAAQJABMYDqYpkRnN08gOFGjIB\r\nJINCItmXDgbiQD/OH4pUBrfmrqrS7StlZZjv4nwVUcycPzwpppFcWOL664j3Kdpo\r\nNQIhAMRqiouNt5LElYxEP4ABwFBSI+ftpsyv/HVVOCWRzawLAiEAsQxamiUEFqSZ\r\ndPSCOgv7ts+okHLCaFOENSfmwExhyS8CIGg3M32qWw3HuqWrDJpJ05WKj7yejxMq\r\nCWTkK59bhmpTAiB+epbW+46aJmhCNtI5aYoepOaEmpbrNI6D8sdTpL1OnQIhAMGH\r\nv/xVuhoWK8FvoLz+j4NOUTwEKuOqyVCk+xN+ey+I\r\n-----END RSA PRIVATE KEY-----\r\n',
            publicKey: '-----BEGIN PUBLIC KEY-----\r\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIfXJEy0uYHqXjRL70tgvwd+BAOG02Hs\r\nsGy4V/coTXu3zgKtvqcY4FKnxwVlxrZ3cpsefjzz0Dg6gMAGobUCOQUCAwEAAQ==\r\n-----END PUBLIC KEY-----\r\n'
        }

        var keys = keyManager.pemToKeys(pems);

        // Keys should be object
        assert.typeOf(keys, 'object');

        // Keys should be objects
        assert.typeOf(keys.publicKey, 'object');
        assert.typeOf(keys.privateKey, 'object');
    })

});

describe('Crypto', function() {

    var keyManager = new KeyManager();

    var privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\n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\r\n-----END RSA PRIVATE KEY-----\r\n';
    var publicKey = '-----BEGIN PUBLIC KEY-----\r\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1t6LreeZakBC/CdxAVKj\r\nJa0kT6E2EHGz7avKmo5P+MDqqJqHTCRgDz/Gfn2M3wBTK0JbXBKGWpOe8YEH3/CY\r\nJTLdMrPceA9AnumMvPVMOk02jlmz+eKn8zW0EUx6egF8yF1TcLVKQcxR//nbAZEY\r\n5YqRs1q6yL35s62ZY5W+ZvaaBFYMXPHMYEunrDBWwlvuyK2WRYDlKd+ELY+6OcvC\r\nJBBkT0SNwBVxz0mNXaqGrv5U9kcSES6RRJjAXd4PokDcn3kXfYps7cPDPjqLovRB\r\n46bsnDms1G4bU/mty6o2i2HJSkmjmqanSlKj2fcm3PGizML7dSTHZZSeQ2tlTmh5\r\n1QiqTwOTY9cR4sDKEP/+ylEKAvqFXFwH3uIL8SUTeUqr9JlDjIA6NVIr7pRzRdqI\r\nYKP68iFWh2Han4NFvlObfKrxI6XtqhYabRJ5CXA2cAd4zRVCDrMacz76TjbUKVPC\r\nbUIR8d+cS91qi+0By4w12SC8+c1pt6ZHWOhLH8+Rp1JThpibJVXXqj63zmGdY9j6\r\n0envsLKy9oEfGZiB8CtEFj5kHVujcufXvslLJkHj7NlZfpoqm5d/rtxELmg3aazS\r\nEi4FdF94hHnW/DasrFP1GiOTAh+0+s9y80PDQVgikpe9k1ieICgHUpM5EmWDndAU\r\nf6wE/PR/1ERPH8/ODFr3Mo0CAwEAAQ==\r\n-----END PUBLIC KEY-----\r\n';

    var privateKey2 = '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXQIBAAKBgQCCy84+JCaV7vnLXYjjk/pHYuLbBqG9EJC8rcSAsysdZSAEDT4Z\r\n5NrFbljuxmIBUHhiIXjstJPHhoVvi+OfLbpurvs6GnrCpntLNwO1WpgOKVawoRk6\r\nWbIlVvDTfXkEonGQcpbqMQdPJw69i9NLcsC5A6SGUCVi6UI4om/OUJApgQIDAQAB\r\nAoGACk9ibIeQ+xShYCR5W+cYPXRQCY/WQ/8ASb8w1CxLY7/K7EbW9FeT3yg5nmjI\r\n5O2g76tPyujZFUtHTWmrgaqrHV1Ayj9PQSSXUKps1zlQLZ9HfjIBIln5D09BDL/u\r\nK4uzNZPAYcg3bB5wS22ZaMmNdSrWw6NF80NdQ+wS/mIy8gECQQDVclYnjxtuXbNg\r\nEbJ4EtkSiTSYhvTnvRG0L2gaVE3LEtYBCFiAY5UllryLAmwTC1Kc3NN1QBs3/Xh+\r\nyaUQ1dwxAkEAnN89Vz58grjvRGMDeMzRNqkjKDh12tgsGatRXzuJDyGdDz4EIcNT\r\nbymdZ0DyQZEweJ+JIMnM1J/eGmLxMWPeUQJBAKfs1Cs7Q3GI9l5Wjfo5md4jY+W8\r\nB2FqNkt0IIrWWH2zy/nz/uzDa8uu05bpyO0Ss2QFt7c/QCrEl8/oBJ1CI4ECQAvr\r\nmsmqYeO9EdFshLMFPVCeAaHoyGvcyV0Z+5D1ATE5KKoj2ESIhyqHSwKxmLcKxVgl\r\nJ1JqgzoU+9eddR5/rEECQQCZ0NdrbBdxR0YrR/OpLQYLBd86001vnmCGY0mxIKUP\r\nNCO8/cA1NnQB/22o8welTU8+jP+MoN3ejFKelRopMVov\r\n-----END RSA PRIVATE KEY-----';
    var publicKey2 = '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCy84+JCaV7vnLXYjjk/pHYuLb\r\nBqG9EJC8rcSAsysdZSAEDT4Z5NrFbljuxmIBUHhiIXjstJPHhoVvi+OfLbpurvs6\r\nGnrCpntLNwO1WpgOKVawoRk6WbIlVvDTfXkEonGQcpbqMQdPJw69i9NLcsC5A6SG\r\nUCVi6UI4om/OUJApgQIDAQAB\r\n-----END PUBLIC KEY-----';

    it('should encrypt message', function() {
        var encrypted = crypto.encrypt(publicKey, 'Hello world!');
        
        // Encrypted message should be string
        assert.typeOf(encrypted, 'string');

        // Encrypted message should contain version, iv, key and cipher
        var parsed = JSON.parse(encrypted);

        assert.typeOf(parsed.v, 'string');       // Version number
        assert.typeOf(parsed.iv, 'string');      // Initialization vector
        assert.typeOf(parsed.keys, 'object');    // Encrypted AES keys
        assert.typeOf(parsed.cipher, 'string');  // Actual encrypted message
    });

    it('should decrypt message', function() {
        var encrypted = '{"v":"hybrid-crypto-js_0.1.0","iv":"NA78kG6uKcCckJX8wuJTT1q7nHki9hsSvFwIr96wqto=","keys":{"85:3d:10:e1:56:f2:ef:14:86:1e:ff:8c:5d:72:9c:82:a3:ff:10:f0":"q2kAMD3VC/HQGfLsbk0OBtk4pFSBIFfbN7Xh47rn+FecBdLUMkSMcLfD/UIqBA3MM3VHOvJ3BXnrduDnbMrrQMZjLaK0SmkSK+vcZmmQjNnlFqlnyGYuGpF/0q3g367rC5RMEa1cRX+12/gLPHEomcby/Onc+Ph12jSjloam+Rv4AlxEoS+5uMD6OeJ3VuBhUjCdZK86sTxoycHgF7GDkIrQr80EqxOwf1xO8XT9izMLDv16FBQ5q6FTZxY5/t2Cf5Vcn9yO+cPFvYd95YfB4T4XwmOKmwy21KhfvAPb1JLVOeJ74Q5/AZugnEDpL0omDDuC6iDZx0L0JqRm81oDDGyYENgW0ElTPM+G2voCR0wx85dFZ5ifypdyLv6C2BiOmCEHSn42Qbs08T3ggVc39dwnUnIHXirfWCzNyAzdhinv5Hv34edFEiVJbZtcGKMJWSpwn2OfT/O1EzhlTrEPsXPDEkKOZYC+bIxzu8BTcOuzsV0tHSUG6bS7o0yAZaFNYUHzCwmPLyLCqaZ5EQsgCdEJ1YObEGxxQkLXdtshcuzFNeRNgS+2z+v1tDVPeB4DmE3cvRc/y5hk84LqpuKSz9mLYW9Iw0DL07Wv0qPpelpOsxtRfePGttF9H9KEh0fXpf9R4zIzXs4iOOTPlWd/H997ah+7RRERZndZpp/7/tE="},"cipher":"CskoOPzs2J2p0ygmW9W9wQ=="}';
        
        // Encrypt encrypted message with corresponding private key
        var decrypted = crypto.decrypt(privateKey, encrypted);

        // Decrypted message should match with original message
        assert.equal(decrypted, 'Hello world!');
    });

    it('should encrypt and decrypt simple message', function() {
        var message = 'Hello world!';

        // Encrypt message with single public key
        var encrypted = crypto.encrypt(publicKey, message);
        
        // Decrypt message with corresponding private key
        var decrypted = crypto.decrypt(privateKey, encrypted);

        // Encrypted message shouldn't match with message
        assert.notEqual(encrypted, message);

        // Output should match with message
        assert.equal(decrypted, message);
    });

    it('should encrypt and decrypt message with uncommon characters', function() {
        var message = 'Ṭèßt ṃéŝŜǎg€: HẹḷȴϿ Ŵöŗľƿ!';
        
        // Encrypt message with single public key
        var encrypted = crypto.encrypt(publicKey, message);

        // Decrypt message with corresponding private key
        var decrypted = crypto.decrypt(privateKey, encrypted);

        // Encrypted message shouldn't match with message
        assert.notEqual(encrypted, message);

        // Output should match with message
        assert.equal(decrypted, message);
    });

    it('should encrypt and decrypt message with multiple RSA keys', function() {
        var message = 'Hello world!';

        // Encrypt message with multiple public keys
        var encrypted = crypto.encrypt([publicKey, publicKey2], message);
        
        // Decrypt message with both private keys
        var decrypted1 = crypto.decrypt(privateKey, encrypted);
        var decrypted2 = crypto.decrypt(privateKey2, encrypted);

        // Decrypted messages should be similar as well as original message
        assert.equal(decrypted1, message);
        assert.equal(decrypted2, message);
        assert.equal(decrypted1, decrypted2);
    });

    it('should not encrypt and decrypt message with unmatching RSA keys', function() {
        var message = 'Hello world!';

        // Encrypt message with single public key
        var encrypted = crypto.encrypt(publicKey, message);
        
        // Decrypt message with corresponding private key
        var decrypted = crypto.decrypt(privateKey2, encrypted);

        // Output should be null
        assert.equal(decrypted, null);
    });

});

describe('Helpers', function() {

    it('toArray should return array as the same array', function() {
        var arr1 = [1, 2, 3, 4, 5];
        var arr2 = helpers.toArray(arr1);

        // Array2 should match with array1
        expect(arr2).to.eql(arr1);
    });

    it('toArray should create array of object', function() {
        var obj = {greeting: 'Hello world!'};
        var arr = helpers.toArray(obj);

        // Array should math with object in array
        expect(arr).to.eql([obj]);
    });

});