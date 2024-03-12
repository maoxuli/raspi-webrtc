// ROS bridge connection 
function CameraConnection(callback_error, callback_connected, callback_close) {
    this.ros = new ROSLIB.Ros();

    this.ros.on('error', function(error) {
        callback_error(error);
    });

    this.ros.on('connection', function() {
        callback_connected();
    });

    this.ros.on('close', function() {
        callback_close();
    });

    this.connect = function(hostname) {
        var service_url = 'ws://' + hostname + ":9090";
        this.ros.connect(service_url); 
    }

    this.connected = function() {
        return this.ros.isConnected(); 
    }
}

// Camera API  
// Provided by camera node
function Camera(connection) {
    var statusTopic = new ROSLIB.Topic({
        ros : connection.ros, 
        name: 'camera/status', 
        messageType : 'std_msgs/String'
    });

    this.subscribe = function(callback_status) {
        statusTopic.subscribe(function(message) {
            callback_status(JSON.parse(message.data));  
        });
    }

    var rpcService = new ROSLIB.Service({
        ros : connection.ros,
        name : 'camera/rpc',
        serviceType : 'camera/JsonService'
    });

    var id = 1; 

    this.call_rpc_service = function(request, callback_success, callback_error) {
        request.jsonrpc = "2.0"
        request.id = id++; 
        var rpcRequest = new ROSLIB.ServiceRequest({
            data : JSON.stringify(request) 
        });
        rpcService.callService(rpcRequest, function(rpcResponse) {
            response = JSON.parse(rpcResponse.data);
            if (response.hasOwnProperty("result")) {
                var id = response.hasOwnProperty("id") ? response.id : null
                callback_success(id, response.result); 
            }
            else if (response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(response.error.code, response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid RPC response: " + response);
            }
        });
        return id - 1; 
    }
}

// Online configuration 
Camera.prototype.check_config = function(params, callback_success, callback_error) {
    var request = {"method": "check_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.update_config = function(params, callback_success, callback_error) {
    var request = {"method": "update_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.reset_config = function(params, callback_success, callback_error) {
    var request = {"method": "reset_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.save_config = function(params, callback_success, callback_error) {
    var request = {"method": "save_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// System
Camera.prototype.shutdown_system = function(params, callback_success, callback_error) {
    var request = {"method": "shutdown_system", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.restart_system = function(params, callback_success, callback_error) {
    var request = {"method": "restart_system", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.system_status = function(params, callback_success, callback_error) {
    var request = {"method": "system_status", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Network 
Camera.prototype.scan_wifi = function(params, callback_success, callback_error) {
    var request = {"method": "scan_wifi", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.connect_wifi = function(params, callback_success, callback_error) {
    var request = {"method": "connect_wifi", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.disconnect_wifi = function(params, callback_success, callback_error) {
    var request = {"method": "disconnect_wifi", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.network_status = function(params, callback_success, callback_error) {
    var request = {"method": "network_status", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Software update  
Camera.prototype.check_software = function(params, callback_success, callback_error) {
    var request = {"method": "check_software", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.download_software = function(params, callback_success, callback_error) {
    var request = {"method": "download_software", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Camera.prototype.install_software = function(params, callback_success, callback_error) {
    var request = {"method": "install_software", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Footage API  
// Provided by footage manager node
function Footage(connection) {
    var statusTopic = new ROSLIB.Topic({
        ros : connection.ros, 
        name: 'footage_manager/status', 
        messageType : 'std_msgs/String'
    });

    this.subscribe = function(callback_status) {
        statusTopic.subscribe(function(message) {
            callback_status(JSON.parse(message.data));  
        });
    }

    var rpcService = new ROSLIB.Service({
        ros : connection.ros,
        name : 'footage_manager/rpc',
        serviceType : 'camera/JsonService'
    });

    var id = 1; 

    this.call_rpc_service = function(request, callback_success, callback_error) {
        request.jsonrpc = "2.0"
        request.id = id++; 
        var rpcRequest = new ROSLIB.ServiceRequest({
            data : JSON.stringify(request) 
        });
        rpcService.callService(rpcRequest, function(rpcResponse) {
            response = JSON.parse(rpcResponse.data);
            if (response.hasOwnProperty("result")) {
                var id = response.hasOwnProperty("id") ? response.id : null
                callback_success(id, response.result); 
            }
            else if (response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(response.error.code, response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid RPC response: " + response);
            }
        });
        return id - 1; 
    }
}

// Online configuration 
Footage.prototype.check_config = function(params, callback_success, callback_error) {
    var request = {"method": "check_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Footage.prototype.update_config = function(params, callback_success, callback_error) {
    var request = {"method": "update_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Footage.prototype.reset_config = function(params, callback_success, callback_error) {
    var request = {"method": "reset_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Footage.prototype.save_config = function(params, callback_success, callback_error) {
    var request = {"method": "save_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Footage 
Footage.prototype.prepare_footage = function(params, callback_success, callback_error) {
    var request = {"method": "prepare_footage", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Footage.prototype.erase_footage = function(params, callback_success, callback_error) {
    var request = {"method": "erase_footage", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Footage.prototype.footage_files = function(params, callback_success, callback_error) {
    var request = {"method": "footage_files", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Footage.prototype.footage_status = function(params, callback_success, callback_error) {
    var request = {"method": "footage_status", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};


// Uploader API 
// provided by footage uploader node 
function Uploader(connection) {
    var statusTopic = new ROSLIB.Topic({
        ros : connection.ros, 
        name: 'footage_uploader/status', 
        messageType : 'std_msgs/String'
    });

    this.subscribe = function(callback_status) {
        statusTopic.subscribe(function(message) {
            callback_status(JSON.parse(message.data));  
        });
    }

    var rpcService = new ROSLIB.Service({
        ros : connection.ros,
        name : 'footage_uploader/rpc',
        serviceType : 'camera/JsonService'
    });

    var id = 1; 

    this.call_rpc_service = function(request, callback_success, callback_error) {
        request.jsonrpc = "2.0"
        request.id = id++; 
        var rpcRequest = new ROSLIB.ServiceRequest({
            data : JSON.stringify(request) 
        });
        rpcService.callService(rpcRequest, function(rpcResponse) {
            response = JSON.parse(rpcResponse.data);
            if (response.hasOwnProperty("result")) {
                var id = response.hasOwnProperty("id") ? response.id : null
                callback_success(id, response.result); 
            }
            else if (response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(response.error.code, response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid RPC response: " + response);
            }
        });
        return id - 1; 
    }
}

// Configuration
Uploader.prototype.check_config = function(params, callback_success, callback_error) {
    var request = {"method": "check_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.update_config = function(params, callback_success, callback_error) {
    var request = {"method": "update_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.reset_config = function(params, callback_success, callback_error) {
    var request = {"method": "reset_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.save_config = function(params, callback_success, callback_error) {
    var request = {"method": "save_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Realtime control 
Uploader.prototype.enable_uploading = function(params, callback_success, callback_error) {
    var request = {"method": "enable_uploading", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.disable_uploading = function(params, callback_success, callback_error) {
    var request = {"method": "disable_uploading", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.uploading_status = function(params, callback_success, callback_error) {
    var request = {"method": "uploading_status", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.start_uploading = function(params, callback_success, callback_error) {
    var request = {"method": "start_uploading", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.stop_uploading = function(params, callback_success, callback_error) {
    var request = {"method": "stop_uploading", "params": params};
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.pause_uploading = function(params, callback_success, callback_error) {
    var request = {"method": "pause_uploading", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Uploader.prototype.resume_uploading = function(params, callback_success, callback_error) {
    var request = {"method": "resume_uploading", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Recorder API
// provided by live recorder node  
function Recorder(connection) {
    var statusTopic = new ROSLIB.Topic({
        ros : connection.ros, 
        name: 'live_recorder/status', 
        messageType : 'std_msgs/String'
    });

    this.subscribe = function(callback_status) {
        statusTopic.subscribe(function(message) {
            callback_status(JSON.parse(message.data));  
        });
    }

    var rpcService = new ROSLIB.Service({
        ros : connection.ros,
        name : 'live_recorder/rpc',
        serviceType : 'camera/JsonService'
    });

    var id = 1; 

    this.call_rpc_service = function(request, callback_success, callback_error) {
        request.jsonrpc = "2.0"
        request.id = id++; 
        var rpcRequest = new ROSLIB.ServiceRequest({
            data : JSON.stringify(request) 
        });
        rpcService.callService(rpcRequest, function(rpcResponse) {
            response = JSON.parse(rpcResponse.data);
            if (response.hasOwnProperty("result")) {
                var id = response.hasOwnProperty("id") ? response.id : null
                callback_success(id, response.result); 
            }
            else if (response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(response.error.code, response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid RPC response: " + response);
            }
        });
        return id - 1; 
    }
}

// Online configuration 
Recorder.prototype.check_config = function(params, callback_success, callback_error) {
    var request = {"method": "check_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.update_config = function(params, callback_success, callback_error) {
    var request = {"method": "update_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.reset_config = function(params, callback_success, callback_error) {
    var request = {"method": "reset_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.save_config = function(params, callback_success, callback_error) {
    var request = {"method": "save_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Realtime commands
Recorder.prototype.enable_live = function(params, callback_success, callback_error) {
    var request = {"method": "enable_live", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.disable_live = function(params, callback_success, callback_error) {
    var request = {"method": "disable_live", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.live_status = function(params, callback_success, callback_error) {
    var request = {"method": "live_status", "params": params};
    return this.call_rpc_service(request, callback_success, callback_error); 
}; 

Recorder.prototype.start_recording = function(params, callback_success, callback_error) {
    var request = {"method": "start_recording", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.stop_recording = function(params, callback_success, callback_error) {
    var request = {"method": "stop_recording", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.pause_recording = function(params, callback_success, callback_error) {
    var request = {"method": "pause_recording", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.resume_recording = function(params, callback_success, callback_error) {
    var request = {"method": "resume_recording", "params": params};  
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.recording_status = function(params, callback_success, callback_error) {
    var request = {"method": "recording_status", "params": params};
    return this.call_rpc_service(request, callback_success, callback_error); 
}; 

Recorder.prototype.start_streaming = function(params, callback_success, callback_error) {
    var request = {"method": "start_streaming", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.stop_streaming = function(params, callback_success, callback_error) {
    var request = {"method": "stop_streaming", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.pause_streaming = function(params, callback_success, callback_error) {
    var request = {"method": "pause_streaming", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.resume_streaming = function(params, callback_success, callback_error) {
    var request = {"method": "resume_streaming", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.streaming_status = function(params, callback_success, callback_error) {
    var request = {"method": "streaming_status", "params": params};
    return this.call_rpc_service(request, callback_success, callback_error); 
}; 

Recorder.prototype.capture_snapshot = function(params, callback_success, callback_error) {
    var request = {"method": "capture_snapshot", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
}; 

Recorder.prototype.stitching_snapshot = function(params, callback_success, callback_error) {
    var request = {"method": "stitching_snapshot", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
}; 

Recorder.prototype.recording_snapshot = function(params, callback_success, callback_error) {
    var request = {"method": "recording_snapshot", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Recorder.prototype.streaming_snapshot = function(params, callback_success, callback_error) {
    var request = {"method": "streaming_snapshot", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Calibrator API for offline calibration
// provided by cameras calib node 
function Calibrator(connection) {
    var statusTopic = new ROSLIB.Topic({
        ros : connection.ros, 
        name: 'cameras_calib/status', 
        messageType : 'std_msgs/String'
    });

    this.subscribe = function(callback_status) {
        statusTopic.subscribe(function(message) {
            callback_status(JSON.parse(message.data));  
        });
    }

    var rpcService = new ROSLIB.Service({
        ros : connection.ros,
        name : 'cameras_calib/rpc',
        serviceType : 'camera/JsonService'
    });

    var id = 1; 

    this.call_rpc_service = function(request, callback_success, callback_error) {
        request.jsonrpc = "2.0"
        request.id = id++; 
        var rpcRequest = new ROSLIB.ServiceRequest({
            data : JSON.stringify(request)
        });
        rpcService.callService(rpcRequest, function(rpcResponse) {
            response = JSON.parse(rpcResponse.data);
            if (response.hasOwnProperty("result")) {
                var id = response.hasOwnProperty("id") ? response.id : null
                callback_success(id, response.result); 
            }
            else if (response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(response.error.code, response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid RPC response: " + response);
            }
        });
        return id - 1; 
    }
}

// Configuration
Calibrator.prototype.check_config = function(params, callback_success, callback_error) {
    var request = {"method": "check_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.update_config = function(params, callback_success, callback_error) {
    var request = {"method": "update_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.reset_config = function(params, callback_success, callback_error) {
    var request = {"method": "reset_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.save_config = function(params, callback_success, callback_error) {
    var request = {"method": "save_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Realtime control 
Calibrator.prototype.enable_calibration = function(params, callback_success, callback_error) {
    var request = {"method": "enable_calibration", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.disable_calibration = function(params, callback_success, callback_error) {
    var request = {"method": "disable_calibration", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.calibration_status = function(params, callback_success, callback_error) {
    var request = {"method": "calibration_status", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.set_mode = function(mode, callback_success, callback_error) {
    var request = {"method": "set_mode", "params": {"mode": mode}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.set_source = function(location, callback_success, callback_error) {
    var request = {"method": "set_source", "params": {"location": location}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.next_frame = function(frame_id, callback_success, callback_error) {
    var request = {"method": "next_frame", "params": {"frame_id": frame_id}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.prev_frame = function(frame_id, callback_success, callback_error) {
    var request = {"method": "prev_frame", "params": {"frame_id": frame_id}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.add_frame = function(frame_id, callback_success, callback_error) {
    var request = {"method": "add_frame", "params": {"frame_id": frame_id}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.remove_frame = function(frame_id, callback_success, callback_error) {
    var request = {"method": "remove_frame", "params": {"frame_id": frame_id}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.estimate_calib = function(callback_success, callback_error) {
    var request = {"method": "estimate_calib"}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.reset_calib = function(callback_success, callback_error) {
    var request = {"method": "reset_calib"}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

Calibrator.prototype.save_calib = function(location, callback_success, callback_error) {
    var request = {"method": "save_calib", "params": {"location": location}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// LiveCalib API for online calibration 
// provided by live calbirator node 
function LiveCalib(connection) {
    var statusTopic = new ROSLIB.Topic({
        ros: connection.ros, 
        name: 'live_calibrator/status', 
        messageType: 'std_msgs/String'
    });

    this.subscribe = function(callback_status) {
        statusTopic.subscribe(function(message) {
            callback_status(JSON.parse(message.data));  
        });
    }

    var id = 1; 

    var rpcService = new ROSLIB.Service({
        ros : connection.ros,
        name : 'live_calibrator/rpc',
        serviceType : 'camera/JsonService'
    });

    this.call_rpc_service = function(request, callback_success, callback_error) {
        request.jsonrpc = "2.0"
        request.id = id++; 
        var rpcRequest = new ROSLIB.ServiceRequest({
            data : JSON.stringify(request) 
        });
        rpcService.callService(rpcRequest, function(rpcResponse) {
            response = JSON.parse(rpcResponse.data);
            if (response.hasOwnProperty("result")) {
                var id = response.hasOwnProperty("id") ? response.id : null
                callback_success(id, response.result); 
            }
            else if (response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(response.error.code, response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid RPC response: " + response);
            }
        });
        return id - 1; 
    }

    var taskAction = new ROSLIB.ActionClient({
        ros: connection.ros,
        serverName: 'live_calibrator/task',
        actionName: 'camera/JsonTaskAction'
    });

    this.cancel_task_action = function() {
        taskAction.cancel();
    }

    this.call_task_action = function(goal, callback_feedback, callback_result, callback_error) {
        if (taskGoal) {
            return; 
        }
        goal.jsonrpc = "2.0"
        goal.id = id++;
        var taskGoal = new ROSLIB.Goal({
            actionClient: taskAction,
            goalMessage: { 
                data: JSON.stringify(goal) 
            }
        });
        taskGoal.on('feedback', function(feedback) {
            // console.log("Action feedback: "); 
            // console.log(feeback);
            json_response = JSON.parse(feedback.data); 
            if (json_response.hasOwnProperty("result")) {
                var id = json_response.hasOwnProperty("id") ? json_response.id : null
                callback_feedback(id, json_response.result);
            }
            else if (json_response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(json_response.error.code, json_response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid action feedback: " + json_response);
            }
        });
        taskGoal.on('result', function(result) {
            console.log("Action result: "); 
            console.log(result);
            json_response = JSON.parse(result.data); 
            if (json_response.hasOwnProperty("result")) {
                var id = json_response.hasOwnProperty("id") ? json_response.id : null
                callback_result(id, json_response.result);
            }
            else if (json_response.hasOwnProperty("error")) {
                if (callback_error != null)
                    callback_error(json_response.error.code, json_response.error.message);
            }
            else {
                if (callback_error != null)
                    callback_error(-32001, "Invalid action result: " + json_response);
            }
        });
        // taskGoal.on('status', function(status) {
        //     console.log("Action status: "); 
        //     console.log(status);
        // });
        taskGoal.send(); 
        console.log("send goal: ")
        console.log(goal)
        return id - 1; 
    }
}

// Configuration
LiveCalib.prototype.check_config = function(params, callback_success, callback_error) {
    var request = {"method": "check_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

LiveCalib.prototype.update_config = function(params, callback_success, callback_error) {
    var request = {"method": "update_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

LiveCalib.prototype.reset_config = function(params, callback_success, callback_error) {
    var request = {"method": "reset_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

LiveCalib.prototype.save_config = function(params, callback_success, callback_error) {
    var request = {"method": "save_config", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

// Realtime control 
LiveCalib.prototype.enable_calibration = function(params, callback_success, callback_error) {
    var request = {"method": "enable_calibration", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

LiveCalib.prototype.disable_calibration = function(params, callback_success, callback_error) {
    var request = {"method": "disable_calibration", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

LiveCalib.prototype.calibration_status = function(params, callback_success, callback_error) {
    var request = {"method": "calibration_status", "params": params}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};

LiveCalib.prototype.online_calib = function(params, callback_feedback, callback_result, callback_error) {
    var goal = {"method": "online_calib", "params": params};
    return this.call_task_action(goal, callback_feedback, callback_result, callback_error); 
}

LiveCalib.prototype.cancel_online_calib = function() {
    return this.cancel_task_action(); 
}

LiveCalib.prototype.save_calib = function(location, callback_success, callback_error) {
    var request = {"method": "save_calib", "params": {"location": location}}; 
    return this.call_rpc_service(request, callback_success, callback_error); 
};
