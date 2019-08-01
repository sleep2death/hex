/*eslint-disable*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const pb = $root.pb = (() => {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    const pb = {};

    pb.Echo = (function() {

        /**
         * Properties of an Echo.
         * @memberof pb
         * @interface IEcho
         * @property {string|null} [message] Echo message
         */

        /**
         * Constructs a new Echo.
         * @memberof pb
         * @classdesc Represents an Echo.
         * @implements IEcho
         * @constructor
         * @param {pb.IEcho=} [properties] Properties to set
         */
        function Echo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Echo message.
         * @member {string} message
         * @memberof pb.Echo
         * @instance
         */
        Echo.prototype.message = "";

        /**
         * Creates a new Echo instance using the specified properties.
         * @function create
         * @memberof pb.Echo
         * @static
         * @param {pb.IEcho=} [properties] Properties to set
         * @returns {pb.Echo} Echo instance
         */
        Echo.create = function create(properties) {
            return new Echo(properties);
        };

        /**
         * Encodes the specified Echo message. Does not implicitly {@link pb.Echo.verify|verify} messages.
         * @function encode
         * @memberof pb.Echo
         * @static
         * @param {pb.IEcho} message Echo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Echo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified Echo message, length delimited. Does not implicitly {@link pb.Echo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Echo
         * @static
         * @param {pb.IEcho} message Echo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Echo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Echo message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Echo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Echo} Echo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Echo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Echo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Echo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Echo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Echo} Echo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Echo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Echo message.
         * @function verify
         * @memberof pb.Echo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Echo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an Echo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Echo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Echo} Echo
         */
        Echo.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Echo)
                return object;
            let message = new $root.pb.Echo();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an Echo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Echo
         * @static
         * @param {pb.Echo} message Echo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Echo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this Echo to JSON.
         * @function toJSON
         * @memberof pb.Echo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Echo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Echo;
    })();

    pb.AddUser = (function() {

        /**
         * Properties of an AddUser.
         * @memberof pb
         * @interface IAddUser
         * @property {string|null} [name] AddUser name
         */

        /**
         * Constructs a new AddUser.
         * @memberof pb
         * @classdesc Represents an AddUser.
         * @implements IAddUser
         * @constructor
         * @param {pb.IAddUser=} [properties] Properties to set
         */
        function AddUser(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddUser name.
         * @member {string} name
         * @memberof pb.AddUser
         * @instance
         */
        AddUser.prototype.name = "";

        /**
         * Creates a new AddUser instance using the specified properties.
         * @function create
         * @memberof pb.AddUser
         * @static
         * @param {pb.IAddUser=} [properties] Properties to set
         * @returns {pb.AddUser} AddUser instance
         */
        AddUser.create = function create(properties) {
            return new AddUser(properties);
        };

        /**
         * Encodes the specified AddUser message. Does not implicitly {@link pb.AddUser.verify|verify} messages.
         * @function encode
         * @memberof pb.AddUser
         * @static
         * @param {pb.IAddUser} message AddUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified AddUser message, length delimited. Does not implicitly {@link pb.AddUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.AddUser
         * @static
         * @param {pb.IAddUser} message AddUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddUser message from the specified reader or buffer.
         * @function decode
         * @memberof pb.AddUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.AddUser} AddUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.AddUser();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.AddUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.AddUser} AddUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddUser message.
         * @function verify
         * @memberof pb.AddUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates an AddUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.AddUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.AddUser} AddUser
         */
        AddUser.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.AddUser)
                return object;
            let message = new $root.pb.AddUser();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from an AddUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.AddUser
         * @static
         * @param {pb.AddUser} message AddUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this AddUser to JSON.
         * @function toJSON
         * @memberof pb.AddUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AddUser;
    })();

    pb.AnyMessage = (function() {

        /**
         * Properties of an AnyMessage.
         * @memberof pb
         * @interface IAnyMessage
         * @property {google.protobuf.IAny|null} [message] AnyMessage message
         */

        /**
         * Constructs a new AnyMessage.
         * @memberof pb
         * @classdesc Represents an AnyMessage.
         * @implements IAnyMessage
         * @constructor
         * @param {pb.IAnyMessage=} [properties] Properties to set
         */
        function AnyMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AnyMessage message.
         * @member {google.protobuf.IAny|null|undefined} message
         * @memberof pb.AnyMessage
         * @instance
         */
        AnyMessage.prototype.message = null;

        /**
         * Creates a new AnyMessage instance using the specified properties.
         * @function create
         * @memberof pb.AnyMessage
         * @static
         * @param {pb.IAnyMessage=} [properties] Properties to set
         * @returns {pb.AnyMessage} AnyMessage instance
         */
        AnyMessage.create = function create(properties) {
            return new AnyMessage(properties);
        };

        /**
         * Encodes the specified AnyMessage message. Does not implicitly {@link pb.AnyMessage.verify|verify} messages.
         * @function encode
         * @memberof pb.AnyMessage
         * @static
         * @param {pb.IAnyMessage} message AnyMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnyMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                $root.google.protobuf.Any.encode(message.message, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AnyMessage message, length delimited. Does not implicitly {@link pb.AnyMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.AnyMessage
         * @static
         * @param {pb.IAnyMessage} message AnyMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnyMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AnyMessage message from the specified reader or buffer.
         * @function decode
         * @memberof pb.AnyMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.AnyMessage} AnyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnyMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.AnyMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.message = $root.google.protobuf.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AnyMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.AnyMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.AnyMessage} AnyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnyMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AnyMessage message.
         * @function verify
         * @memberof pb.AnyMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AnyMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message")) {
                let error = $root.google.protobuf.Any.verify(message.message);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates an AnyMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.AnyMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.AnyMessage} AnyMessage
         */
        AnyMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.AnyMessage)
                return object;
            let message = new $root.pb.AnyMessage();
            if (object.message != null) {
                if (typeof object.message !== "object")
                    throw TypeError(".pb.AnyMessage.message: object expected");
                message.message = $root.google.protobuf.Any.fromObject(object.message);
            }
            return message;
        };

        /**
         * Creates a plain object from an AnyMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.AnyMessage
         * @static
         * @param {pb.AnyMessage} message AnyMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AnyMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.message = null;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = $root.google.protobuf.Any.toObject(message.message, options);
            return object;
        };

        /**
         * Converts this AnyMessage to JSON.
         * @function toJSON
         * @memberof pb.AnyMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AnyMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AnyMessage;
    })();

    return pb;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
