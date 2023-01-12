import React, { useEffect, useRef, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUserContext } from "app/contexts/user-context";
import notificationService from "app/services/notification.service";
import teamMemberService from "app/services/team-member.service";
import TeamMemberInfo from "pages/team/components/team-member-info";

const UserInfoTeam: React.FC = () => {
  const navigate = useNavigate();

  const { currentAuthUser } = useAuthContext();
  const { currentUser } = useUserContext();
  const { currentTeamMember, setCurrentTeamMember } = useUserContext();

  useEffect(() => {
    teamMemberService.getTeamMember(
      currentUser.factionId, currentUser.id
    ).then(response => setCurrentTeamMember(response.data ?? null))
  }, [currentAuthUser])

  return (
    <div className="user-info-team">
      { 
        currentTeamMember &&
          <div className="flex flex-col gap-2 items-start mt-4">
            <div className="flex flex-col">
                <p className="text-3xl font-semibold">Fraktion</p>
                <p className="text-gray-900">{currentUser.faction}</p>
              </div>

            <TeamMemberInfo />
            <Button onClick={() => navigate(`/dashboard/teams/${currentUser.factionId}`, { replace: true })}>Fraktion aufrufen</Button>
          </div>
      }
    </div>
  );
};

export default UserInfoTeam;