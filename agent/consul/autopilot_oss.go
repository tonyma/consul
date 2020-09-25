// +build !consulent

package consul

import (
	autopilot "github.com/hashicorp/raft-autopilot"
)

func (s *Server) initAutopilot(config *Config) {
	apDelegate := &AutopilotDelegate{s}

	s.autopilot = autopilot.New(
		s.raft,
		apDelegate,
		autopilot.WithLogger(s.logger),
		autopilot.WithReconcileInterval(config.AutopilotInterval),
		autopilot.WithUpdateInterval(config.ServerHealthInterval),
	)
}

func (_ *AutopilotDelegate) enterpriseRemoveFailedServer(_ *autopilot.Server) error {
	// nothing to do in OSS
	return nil
}
